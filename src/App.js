import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

function App() {
  const [dataBase, setDB] = useState([]);

  useEffect(() => {
    const dbCollectionRef = collection(db, "sampledata");
    // getDocs(dbCollectionRef).then((querySnapshot) => {
    //   setUsers(
    //     querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   );
    // });
    const unsub = onSnapshot(dbCollectionRef, (querySnapshot) => {
      setDB(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  // const updateCount = async (target) => {
  //   const dbDocRef = doc(db, "sampledata", "JaF38eQNc3MzJGbh93e6");
  //   if (target == 0) {
  //     await updateDoc(dbDocRef, {
  //       countWalkingUpSuccess: Number(target) + 1,
  //     });
  //   } else {
  //     await updateDoc(dbDocRef, {
  //       countDefeatInSleep: Number(target) + 1,
  //     });
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.elements;
    // console.log(form[0].value);
    console.log(form);
    console.log("formID is : " + Number(form[0].id));
    const dbDocRef = doc(db, "sampledata", "JaF38eQNc3MzJGbh93e6");
    let id = Number(form[0].id);
    console.log("ID is : " + id);

    if (id == 0) {
      await updateDoc(dbDocRef, {
        countWalkingUpSuccess: Number(form[0].value) + 1,
      });
    } else {
      await updateDoc(dbDocRef, {
        countDefeatInSleep: Number(form[0].value) + 1,
      });
    }
  };

  return (
    <div className="App">
      {dataBase.map((lambdaDB) => (
        <form key="form" onSubmit={handleSubmit}>
          <div>
            <label>起きれた</label>
            <input
              name="countW"
              type="number"
              defaultValue={lambdaDB.countWalkingUpSuccess}
              id="0"
            />
            <button>起きた</button>
          </div>
        </form>
      ))}

      {dataBase.map((lambdaDB) => (
        <form key="form2" onSubmit={handleSubmit}>
          <div>
            <label>寝てた</label>
            <input
              name="countD"
              type="number"
              defaultValue={lambdaDB.countDefeatInSleep}
              id="1"
            />
            <button>寝てた</button>
          </div>
        </form>
      ))}

      {dataBase.map((lambdaDB) => (
        <div key="state">
          <h1>パラメーター</h1>
          <div>
            <div>寝起き成功：{lambdaDB.countWalkingUpSuccess}</div>
            <div>寝起き失敗：{lambdaDB.countDefeatInSleep}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
