"use client";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { createUser } from "@/db";
import { useRouter } from "next/router";
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
  role: string;
  email: string;
  password: string;
  race: string;
  ethnicity: string;
}

export default function LoginPage() {
  const [switchToLogin, setSwitchToLogin] = useState(true);
  const [switchToSignUp, setSwitchToSignUp] = useState(false);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
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
    setSwitchToSignUp(false);
  };
  const showSignup = () => {
    setSwitchToSignUp(true);
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
    event.preventDefault;

    //post user in database
    axios
      .post("/api/signup", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("this is an error ", err);
      });

    axios.get("/api/signup").then((res) => {
      if (res.data) {
        //logic to set user_id
      }
    });

    console.log(`role: ${formData.role}, email: ${formData.email}, 
    passoword: ${formData.password}, race: ${formData.race}, ethnicity: ${formData.ethnicity}, gender: ${formData.gender}`);
  };

  /*
    TODO:
    send form data to database
      check if its listener or artist
        either way gotta be sent to user 
    call database to get id
    change pages with router
  */
  // const handleFormSumbit = async (e) => {

  //   const primsa = new PrismaClient();
  //   await primsa.$executeRaw`
  //   INSERT INTO user (user_name,email,password,...)
  //   VALUES ()
  //   `
  // }

  return (
    <>
      <div className="login-container">
        <div className="switch-container">
          <p
            className={`switch-container-child ${switchToLogin ? "active" : ""
              }`}
            onClick={showLogin}
          >
            login
          </p>
          <p
            className={`switch-container-child ${switchToSignUp ? "active" : ""
              }`}
            onClick={showSignup}
          >
            signup
          </p>
        </div>
        {switchToLogin && (
          <>
            <form>
              <label>email:</label>
              <input type="text" name="name" placeholder="your email" />

              <label>password:</label>
              <input type="text" name="password" placeholder="password" />

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
                  {role === "listener" ? "user" : "artist "}name
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder={role + " name"}
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

