import { FirebaseApp } from "firebase/app";
import { Observer } from "../abstract/Observer";
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { TDataUser, TGood } from "../abstract/Types";
import { User } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export class DBService extends Observer {
    addGoodInBasket(user: any, data: TGood) {
        throw new Error("Method not implemented.");
    }
    private db: Firestore = getFirestore(this.DBFirestore);
  
    dataUser: TDataUser | null = null;
  
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
          square: data.numbers as number,
          price: data.price as number,
          url: url
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
}