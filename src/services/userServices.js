import axios from 'axios';
import API_URL from '../api';

class UserServices {
  constructor() {
    // GET ALL USER
    this.getUsers = async (setState, sort = false) => {
      await axios.get(`${API_URL}/admins/users`, sort)
        .then((res) => {
          if (!res.data) {
            console.log('data tidak ditemukan');
          }
          setState(res.data.data.users);
        })
        .catch((err) => console.log(err));
    };
    // GET USER ID BY USERNAME
    this.getUserIDByUsername = async (setId, username) => {
      await axios.get(`${API_URL}/users/username/${username}`)
        .then((res) => {
          if (!res.data) {
            console.log('data tidak ditemukan');
          }
          setId(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    // GET ONE USER
    this.getUser = async (id, setState, role = 'users') => {
      try {
        const res = await axios.get(`${API_URL}/${role}/${id}`);
        if (!res.data) {
          console.log('data tidak ditemukan');
        }
        setState(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    // DELETE USER
    this.deleteUser = async (id) => {
      await axios.delete(`${API_URL}/admins/users/${id}`)
        .then(() => console.log('Deleted successfully'))
        .catch((err) => console.log(err));
    };
    // UPDATE USER
    this.updateUser = async (id, data) => {
      await axios.put(`${API_URL}/admins/users/${id}`, data)
        .then(() => console.log('Edit successful'))
        .catch((err) => console.log(err));
    };
    // ADD USER
    this.addUser = async (data) => {
      await axios.post(`${API_URL}/admins/users`, data)
        .then(() => console.log('Add successful'))
        .catch((err) => console.log(err));
    };
    this.logout = async (role, id, setAuth) => {
      await axios.get(`${API_URL}/${role}s/logout/${id}`)
        .then(() => {
          localStorage.clear();
          setAuth({});
        })
        .catch((err) => console.log(err));
    };
    this.updateScore = async () => {
      try {
        await axios.get(`${API_URL}/admins/olim/score`);
      } catch (err) {
        console.log(err);
      }
    };
    this.finishOlim = async (id) => {
      try {
        await axios.put(`${API_URL}/users/olim/finish/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
  }
}

export default new UserServices();
