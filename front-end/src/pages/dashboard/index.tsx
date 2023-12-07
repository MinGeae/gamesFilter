import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/request";
import { removeAccessToken } from "../../utils/utils";
import "./index.css";
import dayjs from "dayjs";

interface Data {
  games?: {
    id: number;
    name: string;
    provider: number;
    date: string;
    cover: string;
  }[];
  providers?: { id: number; name: string }[];
  groups?: { id: number; name: string; games: number[] }[];
}

function Dashboard() {
  const navigate = useNavigate();
  const [list, setList] = useState<Data>({});
  const [user, setUser] = useState<Record<string, string>>({});
  const [provider, setProvider] = useState<string[]>([]);
  const [group, setGroup] = useState<string[]>([]);
  const [sorting, setSorting] = useState<number>();
  const [name, setName] = useState<string>();

  const logout = () => {
    removeAccessToken();
    navigate("/login");
  };

  const handleReset = () => {
    setSorting(undefined);
    setGroup([]);
    setProvider([]);
    setName(undefined);
  };

  const handleSetGroup = (e) => {
    setGroup((group) => {
      let tmp = group.slice();
      const index = group.indexOf(e.target.value);
      if (index !== -1) {
        tmp = tmp.filter((item) => item !== e.target.value);
      } else {
        tmp.push(e.target.value);
      }
      return tmp;
    });
  };

  const handleSetProvider = (e) => {
    setProvider((provider) => {
      let tmp = provider.slice();
      const index = provider.indexOf(e.target.value);
      if (index !== -1) {
        tmp = tmp.filter((item) => item !== e.target.value);
      } else {
        tmp.push(e.target.value);
      }
      return tmp;
    });
  };

  useEffect(() => {
    request({ method: "GET", url: "/profile" })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
    request({ method: "GET", url: "/list" }).then((res) => {
      setList(res.data);
    });
  }, [navigate]);

  // Filtration should be implemented on the client
  const games = useMemo(() => {
    if (!list.groups) {
      return [];
    }
    /**
     * Games that don't belong to any group shouldn't be displayed at all, even if the filter is not configured
     */
    const gameIds = list.groups!.reduce((res, item) => {
      res = res.concat(item.games);
      return res;
    }, []);
    let filterGames = list.games?.filter((game) => gameIds.includes(game.id));

    if (provider.length > 0) {
      filterGames = filterGames.filter((item) =>
        provider.includes(item.provider + "")
      );
    }
    if (group.length > 0) {
      const gameArr: number[] = group.reduce((res, item) => {
        res = res.concat(list.groups.find((gro) => gro.id == item).games);
        return res;
      }, []);

      filterGames = filterGames.filter((item) => gameArr.includes(item.id));
    }
    if (name?.length && name?.length > 0) {
      filterGames = filterGames.filter(
        (item) => item.name.indexOf(name) !== -1
      );
    }
    if (sorting !== undefined) {
      switch (sorting) {
        case 0:
          filterGames = filterGames.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
        case 1:
          filterGames = filterGames.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          break;
        case 2:
          filterGames = filterGames.sort((a, b) => {
            if (dayjs(a.date).isBefore(dayjs(b.date))) {
              return 1;
            }
            if (dayjs(b.date).isBefore(dayjs(a.date))) {
              return -1;
            }
            return 0;
          });
          break;
      }
    }
    console.log(filterGames);
    return filterGames;
  }, [provider, group, name, sorting, list.games]);

  return (
    <div className="dashboard">
      <nav className="nav">
        <div className="right-content">
          <span>{user.username}</span>
          <a onClick={logout}>logout</a>
        </div>
      </nav>
      <div className="content">
        <div className="game-content">
          {games &&
            games.length > 0 &&
            games.map((item) => (
              <div
                key={item.id}
                className="content-div"
                style={{ backgroundImage: `url(${item.cover})` }}
              ></div>
            ))}
        </div>
        <div className="filter-card">
          <div>
            <label className="label-name" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label className="label-name">provider</label>
            {list.providers &&
              list.providers.map((item) => (
                <div className="checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    value={item.id}
                    checked={provider.includes(item.id.toString())}
                    onChange={handleSetProvider}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              ))}
          </div>
          <div>
            <label className="label-name">groups</label>
            {list.groups &&
              list.groups.map((item) => (
                <div className="checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    id={item.name}
                    value={item.id}
                    name={item.name}
                    checked={group.includes(item.id + "")}
                    onChange={handleSetGroup}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              ))}
          </div>
          <div>
            <label className="label-name">sorting</label>

            <div className="checkbox">
              <input
                type="checkbox"
                name="A-Z"
                checked={sorting === 0}
                onChange={() => setSorting(0)}
              />
              <label htmlFor="A-Z">A-Z</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="Z-A"
                checked={sorting === 1}
                onChange={() => setSorting(1)}
              />
              <label htmlFor="Z-A">Z-A</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="Newest"
                checked={sorting === 2}
                onChange={() => setSorting(2)}
              />
              <label htmlFor="Newest">Newest</label>
            </div>
          </div>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
