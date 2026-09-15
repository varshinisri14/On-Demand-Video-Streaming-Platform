function Register() {
  return (
    <div>
      <h2>FounderHub Register</h2>

      <input type="text" placeholder="Full Name" />
      <br /><br />

      <input type="email" placeholder="Email" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <input type="text" placeholder="Phone Number" />
      <br /><br />

      <select>
        <option>User</option>
        <option>Entrepreneur</option>
        <option>Investor</option>
      </select>
      <br /><br />

      <button>Register</button>
    </div>
  );
}

export default Register;