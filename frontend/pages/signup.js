import axios from 'axios';

export default function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/signup', {
      username: e.target.username.value,
      password: e.target.password.value,
    });
    alert("Signup successful. You can now login.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="password" placeholder="Password" type="password" required />
      <button type="submit">Signup</button>
    </form>
  );
}
