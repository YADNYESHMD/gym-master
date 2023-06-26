{isAuthenticated ? (
  <>
      <div className="navbar bg-neutral text-white ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Hello User</a> 
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/"} >
              MyAccount
            </Link>
          </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/exchange"} >
              Exchange
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/buy"} >
              Buy
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/sell"} >
              Sell
            </Link>
            </a>
          </li>
          <li>
          <a className="btn btn-ghost normal-case text-xl">
            <Link to={"/myrequests"} >
              MyRequests
            </Link>
            </a>
          </li>
          <li>
          <button className="btn btn-ghost normal-case text-xl" onClick={() => logout({ returnTo: window.location.origin })}>
                            LOG OUT
          </button>
          </li>
        </ul>
      </div>
      </div>
      
</>
  ) : (
  <>
      <button className="btn btn-ghost normal-case text-xl" onClick={() => loginWithRedirect()}>
          LOG IN or SIGN UP
      </button>
  </>
  )
  }