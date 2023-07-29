import { useState, useEffect } from "react";
import { data } from "./../callHistory";

function App() {
  const [filteredData, setFilteredData] = useState([{}]);
  const [showList, setShowList] = useState("");

  useEffect(() => {
    // Removing repeated contacts
    const uniqueContacts = data.reduce((acc, contact) => {
      const existingContact = acc.find((c) => c.phoneNumber === contact.phoneNumber);
      if (!existingContact) {
        acc.push({
          ...contact,
          numberOfCalls: 1,
          lastCalled: new Date(contact.called * 1000).toLocaleDateString(),
        });
      } else {
        existingContact.numberOfCalls++;
        existingContact.lastCalled = new Date(contact.called * 1000).toLocaleDateString();
      }
      return acc;
    }, []);

    // Sorting contacts by number of calls
    const sortedContacts = uniqueContacts.sort((a, b) => b.numberOfCalls - a.numberOfCalls);

    // Updating the filteredData state with the sortedContacts
    setFilteredData(sortedContacts);
  }, []);

  console.log(filteredData);

  return (
    <article className="flex justify-center items-center mt-[30%]    ">
      <section className="w-[600px] h-[500px] rounded-md flex flex-col justify-start items-center border-white border-[2px] bg-white  ">
        <div className="bg-purple-600 w-[100%] h-[50px] flex justify-center items-center  ">
          <h1 className="text-[24px] font-bold    ">Favorite Contacts</h1>
        </div>
        <div className="w-[95%] my-3 rounded-md border-gray-400 border-[1px] overflow-y-auto  ">
          {filteredData.map((item) => (
            <div
              key={item.phoneNumber + item.called}
              className="flex w-[100%] h-[40px] items-center bg-white text-black  "
            >
              <div className="flex justify-center  w-[20%] ">
                <h3>{item.firstName}</h3>
              </div>
              <div className="flex justify-center w-[20%] font-bold ">
                <h3>{item.lastName}</h3>
              </div>
              <div className="flex justify-center w-[20%] text-[14px] ">
                <i> # of Calls {item.numberOfCalls}</i>
              </div>
              <div className="flex justify-end pr-[10%] gap-5  w-[40%] ">
                <h3>
                  {new Date(item.called * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <span>&#10148;</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default App;
