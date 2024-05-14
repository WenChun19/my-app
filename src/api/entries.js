import { accessToken } from "../constants";
import { getCookie } from "../utils/cookies-helper";
import { validateResult } from "../utils/validation-helpers";

export const updateLuckyDrawEntries = async (collection) => {
    const token = getCookie(accessToken);
  
    const { id } = collection;
    const response = await fetch(`http://localhost:3000/600/draws/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(collection),
    });
  
    const result = await response.json();
    return validateResult(result);
  };