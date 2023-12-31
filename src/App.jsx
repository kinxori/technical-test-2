import UserFilter from "./components/UserFilter";
import bgImg from "./assets/kinxori-background-for-assets-template.png";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ScrollTopButton from "./components/ScrollTopButton";

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
      if (!existingContact) {
        acc.push(contact);
      }
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
          lastCalled: new Date(contact.called * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        });
      } else {
        existingContact.numberOfCalls++;
        existingContact.calls.push(
          new Date(contact.called * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
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
            {item.called}
          </td>
          <td>
            {item.phoneNumber}
          </td>
        </tr>
      </tbody>
    ))}
  </table>;
  `;

  const bonusLogicCode = `
  // ...rest of the code

  if (!existingContact) {

    const id = contact.phoneNumber.slice(-10);   // code added

    acc.push({
      calls: [                                  // code added
        new Date(contact.called * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ],
      id: id,
    });
  } else {
    existingContact.calls.push(                 // code added
      new Date(contact.called * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    existingContact.id;                           // code added
  }
  `;

  const bonusJSXCode = `
{
  filteredData.map((item, index) => (
    <tbody key={index}>
    {/* Rest of the HTML */}
      <tr>
        <td colSpan={5}>
          <table>
            <thead>
              {/* Rest of the HTML */}
            </thead>
            {item.calls?.map((call, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item.id.slice(-5) + index}</td>
                  <td>{call}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </td>
      </tr>
    </tbody>
  ));
}
`;

  return (
    <section className="relative ">
      <img src={bgImg} className="fixed z-[-1000] w-screen h-screen object-cover " />
      <div className="border-box p-10 flex flex-col gap-5 ms:w-[80%] ms:mx-auto ms:gap-10 ls:h-screen ls:gap-20 ls:w-[90%] ls:flex-row ls:justify-evenly ls:items-center  ">
        <div className="flex flex-col gap-3 text-justify ls:gap-5 ls:w-[80%]  ">
          <h1 className="font-[rubik] font-bold text-[60px] mb-5 text-left underline ls:text-[80px] ">
            Hey there!
          </h1>
          <p>
            Welcome, this is my second #technicalTest I've had to complete for a Frontend JR role!
          </p>
          <p>
            This project's primary objective was to leverage the power of{" "}
            <b className="italic">JavaScript Array Methods</b>. Throughout the test, we tackled
            three key tasks:
          </p>
          <ul className="list-disc pl-8 flex flex-col gap-3 ">
            <li>
              <b>Eliminating Duplicate Contacts:</b> Removed redundant users entries to ensure a
              unique list.
            </li>
            <li>
              <b>Counting Call Frequency:</b> Tallied the number of calls for each user.
            </li>
            <li>
              <b>Sorting by Call History:</b> Sorted users based on their latest call history and
              the frequency of calls, identifying the most active contacts.
            </li>
          </ul>
        </div>
        <UserFilter />
      </div>
      <article className="border-box p-10 font-[inter] flex flex-col gap-5 text-justify ms:w-[80%] ms:mx-auto ms:gap-7 ls:gap-10 ls:w-[70%] ls:mx-auto ">
        <h3 className="font-bold text-[30px]">Technical Implementations</h3>
        <p>
          Explore the technical implementations within this section. Delve into the code to uncover
          innovative solutions applied to address intricate challenges and ensure seamless
          functionality. From optimizing data structures to employing algorithms, this is where the
          magic unfolds behind the scenes.
        </p>
        <h4 className="font-bold text-[16px]">1. Original data:</h4>
        <p>
          Here's the raw data set that served as the foundation for this test. This data comprises a
          diverse range of contacts, each with their own call history.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {dataCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">2. Remove repeated users:</h4>
        <p>
          From the original dataset, the first mission is to eliminate redundancy and provide a
          condensed list of unique contacts.
        </p>
        <p>
          Using key React hooks and Array methods, including <b className="italic">"useEffect"</b>,{" "}
          <b className="italic">"useState"</b>, <b className="italic">"reduce()"</b> and{" "}
          <b className="italic">"find()"</b>. These functions work in harmony to sift through the
          data, identifying and excluding duplicate entries. The result is a refined list of
          distinct contacts ready for further analysis and sorting.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {reduceCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">3. Calculating Call Counts for Each User:</h4>
        <p>
          With the refined data stored in the useState variable, a method is employed to calculate
          the number of calls for each user. This involves introducing a new{" "}
          <b className="italic">"numberOfCalls"</b> key-value pair to the array and carefully
          monitoring and updating the call count for each individual. This step provides valuable
          insights into communication frequency
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {numberOfCallsCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">
          4. Sorting Contacts by Call Activity and Latest Communication:
        </h4>
        <p>
          In this phase, the focus shifts to organizing the list of users based on the number of
          calls made, with priority given to those with the highest call activity appearing at the
          top. Concurrently, the numeric date representation is enhanced into a more human-readable
          format.
        </p>
        <p>
          To achieve this, the code employs a combination of array manipulation techniques. First,
          it counts the number of calls for each user, ensuring an accurate measure of their
          communication frequency.
        </p>
        <p>
          In scenarios where multiple users share the same call count, the code further arranges
          them based on the timestamp of their most recent call. This approach ensures a
          comprehensive ranking that takes into account both call volume and recency."
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {sortedUsersCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">5. Displaying Data:</h4>
        <p>
          The final step in this small project is to present our refined data, sourced from{" "}
          <b className="italic">"filteredData"</b>. For a user-friendly and easily digestible
          component, we utilize an HTML <b className="italic">{`<table>`}</b> element along with the{" "}
          <b className="italic">map()</b> function.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {jsxCode}
        </SyntaxHighlighter>
        <h4 className="font-bold text-[16px]">6. Bonus:</h4>
        <p>
          The bonus for this challenge was to ad another expandable row for each user displaying the
          actual calls registered.
        </p>
        <p>
          To achieve this, we introduced an additional column in the{" "}
          <b className="italic">{`"<thead>"`}</b> section and an extra{" "}
          <b className="italic">{`"<tr>"`}</b> in the <b className="italic">{`"<tbody>"`}</b>{" "}
          section. This strategic modification enabled us to incorporate a button for user
          interaction, facilitating the display of individual call histories with just a click.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {bonusJSXCode}
        </SyntaxHighlighter>
        <p>
          To enhance our component, we introduced additional logic that involved creating an{" "}
          <b className="italic">"Array"</b> to store call details within our existing{" "}
          <b className="italic">"Objects"</b>. Furthermore, we implemented a unique{" "}
          <b className="italic">"ID"</b> key-value pair for each entry. These enhancements
          significantly enrich our component's functionality, allowing us to display comprehensive
          information derived from our original dataset.
        </p>
        <SyntaxHighlighter showLineNumbers style={dracula} language="javascript">
          {bonusLogicCode}
        </SyntaxHighlighter>
        <p>
          And that wraps up this technical test! I trust this provides insight into my thought
          process and my technical capabilities. 😁✌️
        </p>
        <i className="ml-auto text-right my-10">
          September 1, 2023
          <br />
          Gustavo Quiroz
        </i>
      </article>
      <ScrollTopButton />
    </section>
  );
}
