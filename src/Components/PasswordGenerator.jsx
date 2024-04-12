import React, { useState } from "react";
import { getRandomNumber, getSpecialChar } from "./utils";
import { useForm } from "./useForm";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-hot-toast";

const PasswordGenerator = () => {
  const [values, setValues] = useForm({
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState("");

  const fieldArray = [
    {
      field: values.uppercase,
      getChar: () => getRandomNumber(65, 90),
    },
    {
      field: values.lowercase,
      getChar: () => getRandomNumber(97, 122),
    },
    {
      field: values.numbers,
      getChar: () => getRandomNumber(48, 57),
    },
    {
      field: values.symbols,
      getChar: () => getSpecialChar(),
    },
  ];

  const generatePassword = () => {
    let generatedPassword = "";

    const checkedFields = fieldArray.filter((field) => field.field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }

    if (generatedPassword) {
      setPassword(generatedPassword);
    } else {
      toast.error("Please select at least one option!");
    }
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to your clipboard!");
    } else {
      toast.error("Please generate a password first!");
    }
  };

  return (
    <div className="bg-lightBodyColor min-h-screen flex justify-center items-center">
      <div className="container mx-auto py-8" style={{ width: "40rem" }}>
        <div className="bg-blue-200 p-4 rounded text-center">
          <h1 className="text-3xl font-bold mb-4">Password Generator</h1>
          <div className="flex flex-col md:flex-row md:justify-center">
            <div className="flex items-center justify-center">
              <div className="flex flex-col mr-8 md:mr-16">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="uppercase"
                    id="uppercase"
                    checked={values.uppercase}
                    onChange={setValues}
                  />
                  <label className="ml-2">Uppercase (A-Z)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    checked={values.numbers}
                    onChange={setValues}
                  />
                  <label className="ml-2">Numbers (0-9)</label>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="lowercase"
                    id="lowercase"
                    checked={values.lowercase}
                    onChange={setValues}
                  />
                  <label className="ml-2">Lowercase (a-z)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={values.symbols}
                    onChange={setValues}
                  />
                  <label className="ml-2">Symbols (!@#$%^&*)</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <label className="mr-2">Password Length:</label>
            <input
              type="number"
              name="length"
              id="length"
              min="6"
              max="20"
              className="w-16 px-2 py-1 border border-gray-300 rounded"
              value={values.length}
              onChange={setValues}
            />
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={generatePassword}
            >
              Generate Password
            </button>
            <button
              className="bg-gray-300 hover:bg-slate-400 text-slate-800 py-2 px-4 rounded"
              onClick={copyToClipboard}
            >
              <FaClipboard />
            </button>
          </div>
          <div className="border border-gray-300 p-4 rounded mt-4">
            <h2 className="font-bold mb-2">Generated Password:</h2>
            <input
              type="text"
              className="w-1/2 p-2 text-center border border-gray-300 rounded"
              placeholder="Min 6 chars, Max 20 chars"
              value={password}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
