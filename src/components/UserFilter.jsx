import { useState, useEffect } from "react";
import { data } from "../../callHistory";

export default function UserFilterComponent() {
  const [filteredData, setFilteredData] = useState([{}]);

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

  // console.log(filteredData);

  return (
    <article className="w-[auto] h-[500px] rounded-md flex flex-col justify-start border-white overflow-hidden bg-white  ">
      <div className="bg-purple-600  py-3 flex justify-center items-center  ">
        <h1 className="text-[24px] font-bold ">Favorite Contacts</h1>
      </div>
      <div className="border-box p-5 overflow-auto">
        <div className="flex items-center justify-around bg-white text-black/50  ">
          <i>Name</i>
          <i># of Calls</i>
          <i>MM/DD/YYYY</i>
        </div>
        <div className="rounded-md w-full border-gray-400 border-[1px]  ">
          {filteredData.map((item) => (
            <div
              key={item.phoneNumber + item.called}
              className="flex my-3 items-center justify-between bg-white text-black  "
            >
              <div className="flex flex-col justify-center items-center w-[40%] ">
                <h3>{item.firstName}</h3>
                <h3 className="font-bold ">{item.lastName}</h3>
              </div>
              <div className="flex justify-center text-[14px] w-[10%] ">
                <i>{item.numberOfCalls}</i>
              </div>
              <div className="flex gap-3 justify-center  w-[50%] ">
                <h3>
                  {new Date(item.called * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </h3>
                <span>&#10148;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
