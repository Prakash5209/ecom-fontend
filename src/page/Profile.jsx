import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Profile() {
  const [profiledetail, setProfiledetail] = useState([]);

  // fetch profile information
  useEffect(() => {
    const profile = async () => {
      const response = await axios.get(
        "http://localhost:8000/account/userInfo/",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
          },
        },
      );
      setProfiledetail(response.data);
      console.log("response.data", response.data);
    };
    profile();
  }, []);

  const updateProfile = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("click");
  };

  return (
    <div className="flex justify-around">
      <div className="border rounded p-4 m-4">
        <form onSubmit={updateProfile}>
          <table className="">
            <tbody>
              <tr>
                <td>Upload</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    type="file"
                    sx={{ width: "100%" }}
                  />
                </td>
              </tr>

              <tr>
                <td>Username</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={profiledetail.username}
                    onChange={(e) =>
                      setProfiledetail({
                        ...profiledetail,
                        username: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <td>First name</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={profiledetail.first_name}
                    onChange={(e) =>
                      setProfiledetail({
                        ...profiledetail,
                        first_name: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <td>Middle name</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={profiledetail.profile?.middle_name}
                    onChange={(e) =>
                      setProfiledetail({
                        ...profiledetail,
                        middle_name: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <td>Last name</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={profiledetail.last_name}
                    onChange={(e) =>
                      setProfiledetail({
                        ...profiledetail,
                        last_name: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={profiledetail.email}
                    onChange={(e) =>
                      setProfiledetail({
                        ...profiledetail,
                        email: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <Button variant="contained" size="small" type="submit">
                    Save
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Profile;
