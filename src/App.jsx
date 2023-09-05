import UserFilter from "./components/UserFilter";
import bgImg from "./assets/kinxori-background-for-assets-template.png";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function App() {
  const dataCode = `
  export const data = [
    { firstName: "John", lastName: "Smith", phoneNumber: "+15551234567", called: 1533556800 },
    { firstName: "John", lastName: "Smith", phoneNumber: "+15551234567", called: 1533633205 },
    { firstName: "Jane", lastName: "Bolster", phoneNumber: "+15555550000", called: 1533633205 },
    { firstName: "William", lastName: "Clubb", phoneNumber: "+15552323231", called: 1533640205 },
    { firstName: "William", lastName: "Clubb", phoneNumber: "+15552323231", called: 1533978805 },
    { firstName: "John", lastName: "Smith", phoneNumber: "+15551234567", called: 1534065205 },
    { firstName: "Christina", lastName: "Brown", phoneNumber: "+15557654321", called: 1534065205 },
    { firstName: "Alexis", lastName: "Johnson", phoneNumber: "+15556677884", called: 1534151605 },
    { firstName: "William", lastName: "Clubb", phoneNumber: "+15552323231", called: 1534238005 },
    { firstName: "Christina", lastName: "Brown", phoneNumber: "+15557654321", called: 1534324405 },
    { firstName: "Maureen", lastName: "Wallace", phoneNumber: "+15554489012", called: 1534410805 },
    { firstName: "Maureen", lastName: "Wallace", phoneNumber: "+15554489012", called: 1534424405 },
    { firstName: "David", lastName: "Glass", phoneNumber: "+15554489122", called: 1534497205 },
    { firstName: "Christina", lastName: "Brown", phoneNumber: "+15557654321", called: 1534583605 },
    { firstName: "Sonja", lastName: "Aston", phoneNumber: "+15553322110", called: 1534670005 },
    { firstName: "Jane", lastName: "Bolster", phoneNumber: "+15555550000", called: 1536058380 },
  ];
`;

  const reduceCode = `
  import { data } from "~/callHistory";

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const uniqueContacts = data.reduce((acc, contact) => {
      const existingContact = acc.find((c) => c.phoneNumber === contact.phoneNumber);
      return acc;
    }, []);

    setFilteredData(uniqueContacts);
  },[]);
  `;

  const numberOfCallsCode = `
  import { data } from "~/callHistory";

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const uniqueContacts = data.reduce((acc, contact) => {
      const existingContact = acc.find((c) => c.phoneNumber === contact.phoneNumber);
      if (!existingContact) {
        acc.push({
          ...contact,
          numberOfCalls: 1,
        });
      } else {
        existingContact.numberOfCalls++;
      }
      return acc;
    }, []);

    setFilteredData(uniqueContacts);
  },[]);
  `;

  const sortedUsersCode = `
  import { data } from "~/callHistory";

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
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

    const sortedContacts = uniqueContacts.sort((a, b) => b.numberOfCalls - a.numberOfCalls);

    setFilteredData(sortedContacts);
  }, []);
  `;

  const jsxCode = `
    <table>
    {filteredData.map((item) => (
      <tbody key={item.phoneNumber + item.called}>
        <tr>
          <td>
            {item.firstName} <span>{item.lastName}</span>
          </td>
          <td>
            {item.numberOfCalls}
          </td>
          <td>
            {new Date(item.called * 1000).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </td>
          <td>
            {item.phoneNumber}
          </td>
        </tr>
      </tbody>
    ))}
  </table>;
  `;

  return (
    <section className="relative ">
      <img src={bgImg} className="fixed z-[-1000] w-screen h-screen object-cover " />
      <div className="border-box p-10 flex flex-col gap-5 h-screen ms:p-[10%] ms:gap-10 ls:gap-20 ls:p-[10%] ls:flex-row ls:justify-evenly ls:items-center  ">
        <div className="flex flex-col gap-3 text-justify ls:gap-5 ls:w-[80%]  ">
          <h1 className="font-[rubik] font-bold text-[60px] text-left underline ls:text-[80px] ">
            Hey there!
          </h1>
          <p className="ls:w-[90%]">
            Welcome, this is my second #technicalTest I've had to complete for a Frontend JR role!
          </p>
          <p className="ls:w-[90%]">
            The main purpose of this project was to test <b className="italic">Array Methods</b>.
            For this test, there was 3 main points to complete:
          </p>
          <ul className="list-disc pl-8">
            <li>Remove repeated contacts</li>
            <li>Count the number of calls for each contact</li>
            <li>Sorting contacts by latest call history and higher calls</li>
          </ul>
        </div>
        <UserFilter />
      </div>
      <article className="border-box p-10 font-[inter] flex flex-col gap-5 text-justify">
        <h3 className="font-bold text-[24px]">Technical Implementations</h3>
        <h4 className="font-bold text-[16px]">Data:</h4>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {dataCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">1. Reduce repeated users:</h4>
        <p>
          From the original data, the first step is to reduce repeated data and return the reduced
          list.
        </p>
        <p>
          To achieve this, we are using High Order Functions (HOF), in this example{" "}
          <b className="italic">useEffect</b>, <b className="italic">useState</b>,{" "}
          <b className="italic">reduce()</b> and <b className="italic">find()</b>.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {reduceCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">2. Count the number of calls for each contact:</h4>
        <p>
          Now, we have a new Array stored in our <b className="italic">useState</b> variable. Using
          the <b className="italic">push()</b> method, we can add a new{" "}
          <b className="italic">key-value</b> named "numberOfCalls" the to the Array with our count
          of calls for each user.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {numberOfCallsCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">
          3. Sorting contacts by latest call history and higher calls:
        </h4>
        <p>
          At this point, the last thing to cover is to sort each user in order to be the highest
          number of calls on top.
        </p>
        <p>
          Additionally to this, we need to convert the date originally in number to a human string.
        </p>
        <p>
          In case there are users with the same number of calls, let's sort them by the latest call
          out of all.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {sortedUsersCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">4. Display data</h4>
        <p>
          The las thing we need to acomplish this small project is to display our final data, which
          comes from <b className="italic">filteredData</b>.
        </p>
        <p>
          For a easy to read component, we will be using{" "}
          <b className="italic">{`<table></table>`}</b> and <b className="italic">map()</b>.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {jsxCode}
        </SyntaxHighlighter>
        <p>
          That all for this technical test! I hope this was helpful to understand a little bit about
          my thought process and my overall skills. 😁✌️
        </p>
      </article>
    </section>
  );
}
