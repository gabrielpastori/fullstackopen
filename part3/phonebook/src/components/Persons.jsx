const Persons = ({ persons, handleDelete }) => {
    return (
        <>
        {
            persons.map((person) => 
                <p key={person.name}>
                    {person.name}: {person.number}
                    <button onClick={handleDelete} name={person.name} id={person.id}>delete</button>
                </p>
            )
        }
        </>
    )
}

export default Persons;