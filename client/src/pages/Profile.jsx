
import { useSelector } from 'react-redux';

function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>


      <form  className='flex flex-col gap-4'>

        <img src={currentUser.data?.rest?.avatar} alt="profile" className="w-20 h-20 rounded-full object-cover cursor-pointer self-center m-2" />
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-50'>Update</button>


      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>

    </div>
  )
}

export default Profile