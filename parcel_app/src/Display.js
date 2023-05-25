import React, { useState } from 'react'

const Display = ({data}) => {
    
    const [combinedData,setCombinedData] = useState(data)
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [newItem,setNewItem] = useState({
        id: '',
        name: '',
        sequence: '',
        group: ''
    })

    const handleItemClick = (index) => {
        setSelectedItem(index);
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
      };

      const resetHandler = () => {
        setCombinedData(data)
        setSelectedItem(null)
        setNewItem(
          {
            id: '',
            name: '',
            sequence: '',
            group: ''
        }
        )
        setSelectedOption('')
      }

      const handleAddAfter = () => {
        if (selectedItem !== null) {
          const newData = [...data];
          newData.splice(selectedItem + 1, 0, newItem);
          setCombinedData(newData);
          setSelectedItem(null);
          setSelectedOption('')
          setNewItem({
            id: '',
            name: '',
            sequence: '',
            group: ''
        });
        }
      };

      const handleAddBefore = (index) => {
        if (newItem !== null) {
          const newData = [...data];
          newData.splice(selectedItem, 0, newItem);
          setCombinedData(newData);
          setSelectedItem(null);
          setSelectedOption('')
          setNewItem({
            id: '',
            name: '',
            sequence: '',
            group: ''
        });
        }
      };

      const handleReplaceItem = () => {
        if (selectedItem !== null && newItem !== '') {
          const updatedList = [...data];
          updatedList[selectedItem] = newItem;
          setCombinedData(updatedList);
          setSelectedItem(null);
          setNewItem('');
        }
      };

      const handleDeleteItem = () => {
        if (selectedItem !== null) {
          const updatedList = combinedData.filter((_, index) => index !== selectedItem);
          setCombinedData(updatedList);
          setSelectedItem(null);
        }
      };

  return (
    <>
    <div className='bg-black w-full h-auto'>
    <div className='flex overflow-x-auto bg-gray-200 px-2 '>
      {
        combinedData.map((item,index) => (
            <ul >
            <li 
                className='flex p-8  box-border border border-gray-300 text-black bg-blue-50 w-44 h-24  ' 
                key={index}
                onClick={() => handleItemClick(index)}
                >{item.name}</li></ul>
        ))
      }
      </div>
      <div className='p-10 flex space-x-8'>
      <h2 className='text-white'>Selected Item :</h2>
        {selectedItem !== null ? (
          <div>
            <h3 className='text-white'>{data[selectedItem].name}</h3>
          </div>
        ) : (
          <p className='text-white'>No item selected</p>
        )}
      </div>
      <div class="bg-gray-200 w-1/2 ml-4 p-4 rounded-lg h-40 flex flex-col">
  
          Enter Name : 
          <input
          className='mr-2 mb-2 bg-gray-200 p-2 rounded-xl'
          type="text"
          name="name"
          placeholder="Name"
          value={newItem.name}
          onChange={handleInputChange}
          />
          Select Location Group: 
          <select value={selectedOption} onChange={handleSelectChange} className='mr-12 mb-2 bg-gray-200 p-2 rounded-xl'>
          <option value="">-- Select --</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
          <div className='flex justify-center p-44 max-w-screen-xl'>
          <button className='bg-yellow-200 mx-3 w-40 h-12 rounded-lg' onClick={handleAddAfter} disabled={selectedItem === null}>
          Add After
        </button>
        <button className='bg-yellow-200 mx-3 w-40 h-12 rounded-lg' onClick={() => handleAddBefore()} disabled={selectedItem === null}>
          Add Before
        </button>
        <button className='bg-yellow-200 mx-3 w-40 h-12 rounded-lg' onClick={resetHandler} >
          Refresh
        </button>
        <button className='bg-yellow-200 mx-3 w-40 h-12 rounded-lg' onClick={handleDeleteItem} >
          Delete 
        </button>
        <button className='bg-yellow-200 mx-3 w-44 h-12 rounded-lg' onClick={handleReplaceItem} >
          Replace
        </button>
        </div>
      </div>
    </>
  )
}

export default Display
