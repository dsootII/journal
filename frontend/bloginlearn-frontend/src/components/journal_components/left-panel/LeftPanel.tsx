"use client"
import ContainerDetail from './ContainerDetail';
import EntryList from './EntryList';

//this component should fetch all the component details, along with the entries, and give it to it's children.


export default function LeftPanel() {  

  return (
    <div className='flex flex-col h-screen'>
        
      <ContainerDetail />      
      <EntryList />
        
    </div>
  )
}