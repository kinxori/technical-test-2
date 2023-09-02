import { useState, useEffect } from "react";
import { data } from "../../callHistory";

export default function UserFilterComponent() {
  const [filteredData, setFilteredData] = useState([{}]);

  useEffect(() => {
    // Reducing repeated contacts
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
    <article className="rounded-md w-full flex flex-col justify-start border-white overflow-hidden bg-white  ">
      <div className="bg-purple-600  py-3 flex justify-center items-center  ">
        <h1 className="text-[24px] text-white font-bold ">Favorite Contacts</h1>
      </div>
      <div className="border-box p-5 overflow-auto">
        <table className="w-full border-gray-400 border-[1px] text-black border-collapse ">
          <thead>
            <tr className="text-center bg-black/20 h-[50px]">
              <th className=" border-gray-400 border-[1px] min-w-[150px]   ">
                <i>Name</i>
              </th>
              <th className=" border-gray-400 border-[1px] min-w-[100px]">
                <i># of Calls</i>
              </th>
              <th className=" border-gray-400 border-[1px] min-w-[150px]">
                <i>mm/dd/yyyy</i>
              </th>
              <th className=" border-gray-400 border-[1px] min-w-[150px]  ">
                <i>Phone #</i>
              </th>
            </tr>
          </thead>
          {filteredData.map((item) => (
            <tbody key={item.phoneNumber + item.called}>
              <tr className="text-center  h-[35px] even:bg-blue-100">
                <td className="border-gray-400 border-[1px] ">
                  <h3>
                    {item.firstName} <span className="font-bold">{item.lastName}</span>
                  </h3>
                </td>
                <td className="border-gray-400 border-[1px] ">{item.numberOfCalls}</td>
                <td className="border-gray-400 border-[1px] ">
                  {new Date(item.called * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </td>
                <td className="border-gray-400 border-[1px]">{item.phoneNumber}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </article>
  );
}
