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
      <div className="border-box p-5 overflow-auto ">
        <table className="w-full rounded-md overflow-hidden shadow-lg shadow-black/20 border-gray-400 border-y-[1px] text-black border-collapse ">
          <thead className="text-center bg-purple-600 h-[70px] text-white ">
            <tr className=" border-gray-400 border-y-[1px]  ">
              <th className="min-w-[150px]   ">
                <i>Name</i>
              </th>
              <th className="min-w-[100px]">
                <i># of Calls</i>
              </th>
              <th className="min-w-[150px]">
                <i>Last Call </i>
                <h5 className="text-white/50 text-[10px] font-normal ">(mm/dd/yyyy)</h5>
              </th>
              <th className="min-w-[150px]  ">
                <i>Phone Number</i>
              </th>
            </tr>
          </thead>
          {filteredData.map((item) => (
            <tbody
              key={item.phoneNumber + item.called}
              className="even:bg-purple-50 h-[50px] text-center "
            >
              <tr className="border-gray-400 border-y-[1px]">
                <td>
                  <h3>
                    {item.firstName} <span className="font-bold">{item.lastName}</span>
                  </h3>
                </td>
                <td>{item.numberOfCalls}</td>
                <td>
                  {new Date(item.called * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </td>
                <td>{item.phoneNumber}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </article>
  );
}
