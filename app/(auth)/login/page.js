export default function LoginPage() {
  return (
    <div>
      <form>
        <label>
          user first name:
          <input value={firstname} />
        </label>
        <label>
          user last name:
          <input value={lastname} />
        </label>
        <label>
          user name:
          <input value={username} />
        </label>
        <label>
          password name:
          <input value={password} />
        </label>
      </form>
    </div>
  );
}
