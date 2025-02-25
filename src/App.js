import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUser } from './redux/counter/userSlice';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();

  const listUser = useSelector((state) => state.user.listUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  if (isError === true && isLoading === false) {
    return (
      <div style={{color: "red"}}>Something Wrong</div>
    )
  }

  
  if (isError === false && isLoading === true) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <div className="App">
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((item, index) => (
                <tr key={`table-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
