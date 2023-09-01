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
        <h1 className="text-[24px] text-white font-bold ">Favorite Contacts</h1>
      </div>
      <div className="border-box p-5 overflow-auto grid grid-flow-row">
        <table className="w-full border-gray-400 border-[1px] text-black border-collapse ">
          <tr className="text-center bg-black/20">
            <th className=" border-gray-400 border-[1px]">
              <i>Name</i>
            </th>
            <th className=" border-gray-400 border-[1px]">
              <i># of Calls</i>
            </th>
            <th className=" border-gray-400 border-[1px] ">
              <i>mm/dd/yyyy</i>
            </th>
          </tr>
          {filteredData.map((item) => (
            <tr key={item.phoneNumber + item.called} className="text-center">
              <td className="border-gray-400 border-[1px] ">
                <h3>
                  {item.firstName} <span className="font-bold">{item.lastName}</span>
                </h3>
              </td>
              <td className="border-gray-400 border-[1px] ">{item.numberOfCalls}</td>
              <td className="border-gray-400 border-[1px]">
                {new Date(item.called * 1000).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </article>
  );
}
