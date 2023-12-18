import { FirebaseApp } from "firebase/app";
import { Observer } from "../abstract/Observer";
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, setDoc, DocumentData, Timestamp, addDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { TDataBasket, TDataGraph, TDataHistory, TDataUser, TGood, TGoodBasket } from "../abstract/Types";
import { User } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export class DBService extends Observer {
  /* addGoodInBasket(user: any, data: TGood) {
       throw new Error("Method not implemented.");
   }*/
  private db: Firestore = getFirestore(this.DBFirestore);

  dataUser: TDataUser | null = null;

  dataBasket: TDataBasket = {
    summa: 0,
    count: 0,
  };

  constructor(private DBFirestore: FirebaseApp) {
    super();
  }

  async getAllGoods(): Promise<TGood[]> {
    const querySnapshot = await getDocs(collection(this.db, "goods"));
    const storage = getStorage();
    const goods = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      // console.log(uri);
      const url = await getDownloadURL(uri);
      const good = {
        name: data.name as string,
        numbers: data.numbers as number,
        square: data.square as string,
        price: data.price as string,
        date: data.date as string[],
        url: url,
        id: doc.id
      };
      return good;
    });
    return Promise.all(goods);
  }

  async getDataUser(user: User | null): Promise<void> {
    if (user === null) return;

    const docRef = doc(this.db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.dataUser = docSnap.data() as TDataUser;
      console.log(docSnap.data());
    } else {
      const data = {
        email: user.email,
        name: user.displayName,
        fotoUrl: user.photoURL,
        basket: []
      };
      await setDoc(doc(this.db, "users", user.uid), data);
      const docSetSnap = await getDoc(docRef);
      this.dataUser = (docSetSnap.data() as TDataUser) || null;
      console.log("create document!");
    }
  }

  async addGoodInBasket(user: User | null, good: TGood): Promise<void> {
    if (!user || !this.dataUser || good.numbers === 0) return;

    const index = this.dataUser.basket.findIndex((el) => el.good.id === good.id);
    if (index >= 0) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);

    const goodBasket = {
      good: good,
      count: 1
    } as TGoodBasket;

    newUser.basket.push(goodBasket);

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.dispatch('goodInBasket', goodBasket);
      })
      .catch(() => { });

  }

  async delGoodFromBasket(user: User | null, good: TGoodBasket): Promise<void> {
    if (!user || !this.dataUser) return;

    const newBasket = this.dataUser.basket.filter((el) => el.good.id !== good.good.id);

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);
    newUser.basket = newBasket;

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.dispatch('delGoodFromBasket', good.good.id);
      })
      .catch(() => { });
  }
  calcCostGood(count: number, price: number): number {
    const cost = count * price;
    return cost;
  }
  async calcDataBasket(user: User | null): Promise<void> { //высчитывает общую сумму корзины
    if (!user || !this.dataUser) return;
    let summa = 0;
    let count = 0;
    this.dataUser.basket.forEach(el => {
      summa += el.count * Number(el.good.price);
      count += el.count;
    })

    this.dataBasket.summa = summa;
    this.dataBasket.count = count;
  }
  async addBasketInHistory(user: User | null, date: string): Promise<void> {
    if (!user || !this.dataUser) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);
    newUser.basket = [];

    // const selectedDateTimestamp = Timestamp.fromDate(date); // Преобразуем выбранную дату в Timestamp

    const dataHistory = {
      basket: this.dataUser.basket,
      dataBasket: this.dataBasket,
      data: Timestamp.now(),
      date: date // Используем выбранную дату в истории
    };

    await addDoc(collection(this.db, 'users', user.uid, 'history'), dataHistory)
      .then(async () => {
        await setDoc(doc(this.db, 'users', user.uid), newUser)
          .then(() => {
            if (!this.dataUser) throw "БД отсутствует";
            this.dataUser.basket.forEach((el) => {
              this.dispatch('delBookFromBasket', el.good.id);
            });
            this.dispatch('addInHistory', dataHistory);
            this.dataUser = newUser;
            this.calcDataBasket(user);
            this.dispatch('clearBasket');
            this.dispatch('changeDataBasket', this.dataBasket);
            this.calcCountDocsHistory(user);
          })
          .catch(() => { });
      })
      .catch(() => { });
  }
  async removeDateFromGood(goodId: string, dates: string[], selectedDate: string): Promise<void> {
    const index = dates.indexOf(selectedDate); // Находим индекс выбранной даты в массиве

    if (index !== -1) {
      dates.splice(index, 1); // Удаляем выбранную дату из массива
    }

    const docRef = doc(this.db, 'goods', goodId);
    await updateDoc(docRef, {
      date: dates // Используем обновленный массив дат
    });
  }
  async calcCountDocsHistory(user: User | null): Promise<void> {//считает количество документов в истории
    if (!user || !this.dataUser) return;

    const querySnapshot = await getDocs(collection(this.db, "users", user.uid, "history"));
    const count = querySnapshot.docs.length;
    let summa = 0;
    querySnapshot.docs.forEach(el => {
      summa += el.data().dataBasket.count;
    })
    this.dispatch('changeStat', count, summa);
  }
  async getAllHistory(user: User | null): Promise<TDataHistory[]> {
    if (!user || !this.dataUser) return [];
    const querySnapshot = await getDocs(collection(this.db, 'users', user.uid, 'history'));
    const rez = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TDataHistory;
      data.id = doc.id;
      return data;
    })
    return rez;
  }
  updateDataGraph(histories: TDataHistory[]): TDataGraph[] {
    const data = {} as Record<string, number>;
    histories.forEach((el) => {
      const dataString = el.data.toDate().toDateString()
      if (data[dataString]) {
        data[dataString] += el.dataBasket.count;
      } else {
        data[dataString] = el.dataBasket.count;
      }
    });
    const sortData = [];
    for (const day in data) {
      sortData.push({
        x: new Date(day),
        y: data[day]
      });
    }
    return sortData.sort(
      (a, b) => a.x.getMilliseconds() - b.x.getMilliseconds()
    );
  }
}
