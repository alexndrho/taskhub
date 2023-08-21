import Link from 'next/link';

const MainNavbar = () => {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl font-bold">
          TaskHub
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/account/login">Log In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
