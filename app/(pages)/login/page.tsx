"use client";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import "./login.css";

interface RadioProps {
  label: string;
  value: string;
  checked: string;
  setter: any;
  spanText: string;
}

interface FormData {
  username: string;
  role: string;
  email: string;
  password: string;
  birthdate: string;
  race: string;
  ethnicity: string;
  gender: string;
}

export default function LoginPage() {
  const user = useUser();
  const router = useRouter();
  const [switchToLogin, setSwitchToLogin] = useState(true);
  const [switchToSignUp, setSwitchToSignUp] = useState(false);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    email: "",
    password: "",
    birthdate: "",
    race: "",
    ethnicity: "",
    gender: "",
  });

  const RadioInput = ({
    label,
    value,
    checked,
    setter,
    spanText,
  }: RadioProps) => {
    return (
      <label>
        <input
          type="radio"
          checked={checked == value}
          onChange={() => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [label]: value,
            }));
            setter(value);
          }}
        />
        <span>{spanText}</span>
      </label>
    );
  };

  const showLogin = () => {
    setSwitchToLogin(true);
    setFormData({
      username: "",
      role: "",
      email: "",
      password: "",
      birthdate: "",
      race: "",
      ethnicity: "",
      gender: "",
    });
    setSwitchToSignUp(false);
  };

  const showSignup = () => {
    setSwitchToSignUp(true);
    setFormData({
      username: "",
      role: "",
      email: "",
      password: "",
      birthdate: "",
      race: "",
      ethnicity: "",
      gender: "",
    });
    setSwitchToLogin(false);
  };

  const handleSelect = (event: any) => {
    setRace(event.target.value);
    // return (event: any) => {
    //   setter(event.target.value);
    // };
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    //post user in database
    try {
      const sigupResponse = await axios.post("/api/signup", formData);
      console.log(sigupResponse);

      const userResponse = await axios.get(`/api/signup?email=${formData.email}`);
      console.log("userresponse: ",userResponse);
      const userID: number = userResponse.data[0].user_id;
      if(userID){
        user.setUserId(userID);
        console.log(typeof user.userId);
        console.log(formData.role);
        if(formData.role === "artist"){
          user.setUserRole("artist");
          const res = await axios.post('/api/signupArtist',{...formData, userID: userID});
          console.log("success signing up artist", res)
        } else {
          user.setUserRole("listener");
          const res = await axios.post('/api/signupListener',{...formData, userID: userID});
          console.log("success signing up listener", res)
        }
        router.push('/');
      }
    } catch (err) {
      console.error("Error signing up USER", err);
    }

    alert(`username: ${formData.username} role: ${formData.role}, email: ${formData.email}, birthdate ${formData.birthdate} 
    passoword: ${formData.password}, race: ${formData.race}, ethnicity: ${formData.ethnicity}, gender: ${formData.gender}`);
  };

 

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try{
      const userResponse = await axios.get(`/api/signup?email=${formData.email}`);
      const {user_id, is_artist, is_admin} = userResponse.data[0];
      user.setUserId(user_id);

      if(is_artist === 1){
        user.setUserRole("artist");
        const artistResponse = await axios.get(`/api/signupArtist?user_id=${user_id}`);
        const artistID = artistResponse.data[0].artist_id;
        //set zustand variable
      } else if(is_admin === 1){
        user.setUserRole("admin");

        //admin logic
      } else {
        user.setUserRole("listener");
        const listenerResponse = await axios.get(`/api/signupListener?user_id=${user_id}`);
        const listenerID = listenerResponse.data[0].listener_id;;
        //set zustand variable
      }

      
      router.push('/');
    } catch (err) {

    }
  }

  /*
    TODO:
    send form data to database
      check if its listener or artist
        either way gotta be sent to user 
    call database to get id
    change pages with router
  */

  return (
    <>
      <div className="login-container">
        <div className="switch-container">
          <p
            className={`switch-container-child ${
              switchToLogin ? "active" : ""
            }`}
            onClick={showLogin}
          >
            login
          </p>
          <p
            className={`switch-container-child ${
              switchToSignUp ? "active" : ""
            }`}
            onClick={showSignup}
          >
            signup
          </p>
        </div>
        {switchToLogin && (
          <>
            <form onSubmit={handleLogin}>
              <label>email:</label>
              <input type="text" 
                     name="name"
                     value={formData.email}
                     placeholder="your email" 
                     onChange={handleChange} />

              <label>password:</label>
              <input type="password"
                     name="password" 
                     value={formData.password}
                     placeholder="password" 
                     onChange={handleChange}/>

              <input type="submit" value="Submit" />
            </form>
          </>
        )}
        {switchToSignUp && (
          <>
            <form onSubmit={handleSignUp}>
              <div>
                <RadioInput
                  label="role"
                  value="artist"
                  checked={role}
                  setter={setRole}
                  spanText="Artist"
                />
                <RadioInput
                  label="role"
                  value="listener"
                  checked={role}
                  setter={setRole}
                  spanText="Listener"
                />
              </div>
              {role != "" && (
                <label>
                  username
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="your username"
                    onChange={handleChange}
                  />
                </label>
              )}

              <label>sign up email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>sign up password:</label>
              <input
                type="text"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>
                Birth Date
                <input
                  type="date"
                  name="birthdate"
                  defaultValue={formData.birthdate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Race
                <select
                  name="race"
                  defaultValue={formData.race}
                  onChange={handleChange}
                >
                  <option value="white">white</option>
                  <option value="hispanic">hispanic</option>
                  <option value="black">black</option>
                  <option value="asian">asian</option>
                  <option value="me">middle eastern</option>
                </select>
              </label>
              <label>
                Ethicity
                <select
                  name="ethnicity"
                  defaultValue={formData.ethnicity}
                  onChange={handleChange}
                >
                  <option value="white">white</option>
                  <option value="black">black</option>
                  <option value="hispanic">hispanic</option>
                  <option value="asian">asian</option>
                  <option value="me">middle eastern</option>
                </select>
              </label>
              <label>
                Gender:
                <RadioInput
                  label="gender"
                  value="male"
                  checked={gender}
                  setter={setGender}
                  spanText="Male"
                />
                <RadioInput
                  label="gender"
                  value="female"
                  checked={gender}
                  setter={setGender}
                  spanText="Female"
                />
              </label>

              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
