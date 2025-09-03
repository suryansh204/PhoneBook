// const Persons = (props) => {
//   return (
//     <ul>
//       {props.filterPerson.map((person) => {
//         console.log(person); 

 
//         return (
//           <li key={person.id}>
          
//             {person.name}: {person.number + "   "}{''}
//               <button onClick={() => props.onDelete(person.id)}>delete</button>
//           </li>
        
//         );
//       })}
//     </ul>
//   );
// };
const Personx = ({ filterPerson, onDelete }) => {
  console.log("Persons component rendered, onDelete is:", typeof onDelete); // Add this
  
  return (
    <ul>
      {filterPerson.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}{' '}
          <button
            type="button"
            onClick={() => {
              console.log('clicked', person.id);     
              console.log('onDelete function:', onDelete); // Add this
              onDelete(person.id);
            }}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Personx;