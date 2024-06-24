18/6/24
there are too many re-renders happening once I see it from debugger. I think I'm not using the useEffect correctly. State management is also not good. 

What I'd like to try is, using redux to have a global user state, which is populated as soon as the user logs in, and is regularly refreshed from the token

Basically authentication and authorization should be separated from having the user details.

Aaj ye implement karte hai. 