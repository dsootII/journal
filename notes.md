2/7/24
The add new container modal is not working, perhaps it needs to be toggled using a state, and the button needs to toggle the state. 





18/6/24
there are too many re-renders happening once I see it from debugger. I think I'm not using the useEffect correctly. State management is also not good. 

What I'd like to try is, using redux to have a global user state, which is populated as soon as the user logs in, and is regularly refreshed from the token

Basically authentication and authorization should be separated from having the user details.

Aaj ye implement karte hai. 