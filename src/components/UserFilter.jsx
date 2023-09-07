import { useState, useEffect } from "react";
import { data } from "../../callHistory";

export default function UserFilterComponent() {
  const [filteredData, setFilteredData] = useState([{}]);
  const [expandRow, setExpandRow] = useState({});

  useEffect(() => {
    const uniqueContacts = data.reduce((acc, contact) => {
      const existingContact = acc.find((c) => c.phoneNumber === contact.phoneNumber);
      if (!existingContact) {
        const id = contact.phoneNumber.slice(-10); // Extract the last 10 digits as the ID
        acc.push({
          ...contact,
          numberOfCalls: 1,
          lastCalled: new Date(contact.called * 1000).toLocaleDateString(),
          calls: [contact],
          id: id,
        });
      } else {
        existingContact.numberOfCalls++;
        existingContact.lastCalled = new Date(contact.called * 1000).toLocaleDateString();
        existingContact.calls.push(contact);
        existingContact.id = existingContact.phoneNumber.slice(-10);
      }
      return acc;
    }, []);

    const sortedContacts = uniqueContacts.sort((a, b) => b.numberOfCalls - a.numberOfCalls);

    setFilteredData(sortedContacts);
  }, []);

  const handleExpandRow = (item) => {
    setExpandRow((prevState) => ({
      ...prevState,
      [item.phoneNumber]: !prevState[item.phoneNumber],
    }));
  };
  // console.log(expandRow);
  console.log(filteredData);

  return (
    <article className="rounded-md w-full flex flex-col justify-start border-white overflow-hidden bg-white  ">
      <div className="border-box p-5 overflow-auto ">
        <table className=" w-[100%] rounded-md overflow-hidden shadow-lg shadow-black/20 border-gray-400 border-y-[1px] text-black border-collapse ">
          <thead className="text-center bg-purple-600 h-[70px] text-white  w-[100%] ">
            <tr className=" border-purple-600 border-y-[1px]  ">
              <th className="min-w-[50px]">
                <i>&#160;</i>
              </th>
              <th className="min-w-[150px]">
                <i>Name</i>
              </th>
              <th className="min-w-[100px]">
                <i>Amount</i>
              </th>
              <th className="min-w-[150px]">
                <i>Last Call</i>
                <h5 className="text-white/50 text-[10px] font-normal ">(mm/dd/yyyy)</h5>
              </th>
              <th className="min-w-[150px]  ">
                <i>Phone Number</i>
              </th>
            </tr>
          </thead>
          {filteredData.map((item, index) => (
            <tbody key={index} className="even:bg-purple-100 text-center w-[100%] ">
              <tr className="border-purple-600 border-t-[1px] h-[50px]">
                <td>
                  <button
                    className="bg-transparent hover:border-none "
                    onClick={() => handleExpandRow(item)}
                  >
                    <i
                      className={`fa-solid fa-chevron-down transition-all 
                      ${expandRow[item.phoneNumber] ? "rotate-180" : "rotate-0"} `}
                    ></i>
                  </button>
                </td>
                <td>
                  {item.firstName} <span>{item.lastName}</span>
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
              <tr>
                <td colSpan={5}>
                  <div
                    className={`transition-all duration-[.4s] ease-in overflow-hidden
                    ${expandRow[item.phoneNumber] ? "max-h-[300px]" : "max-h-0"}`}
                  >
                    <h3 className="font-bold text-left p-5 text-[20px] ">Call History</h3>
                    <table className="w-full ">
                      <thead>
                        <tr className="h-[50px]">
                          <th className="min-w-[150px]">ID</th>
                          <th className="min-w-[250px]">Date</th>
                        </tr>
                      </thead>
                      {item.calls?.map((call, index) => (
                        <tbody key={index}>
                          <tr className="h-[40px] border-purple-600 border-t-[1px]">
                            <td>{Math.round((item.id * call.called + index) / 1000000)}</td>
                            <td>
                              {new Date(call.called * 1000).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </article>
  );
}
