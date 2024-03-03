const PersonForm = ({ handlePhoneAdd, handleNameChange, handlePhoneChange}) => {
    return (
        <form onSubmit={handlePhoneAdd}>
        <div>
            name: <input onChange={handleNameChange} />
        </div>
        <div>
            phone: <input onChange={handlePhoneChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm;