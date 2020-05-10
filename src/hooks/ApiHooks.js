import {useState, useEffect} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useAllMedia = () => {
  const [data, setData] = useState([]);

  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/haunderTest');
    const json = await response.json();

    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const kuva = await response.json();

          // hae avatar kuva.user_id:n avulla
          // eslint-disable-next-line
        const response2 = await fetch(
              baseUrl + 'tags/Havatar_' + kuva.user_id,
          );
          const avatar = await response2.json();
          // lisää avatar kuvaan
          kuva.avatar = avatar;

          // jos on token niin näkee muiden nimet
          if (localStorage.getItem('token') !== null) {
            const userResponse = await getUser(
                kuva.user_id,
                localStorage.getItem('token'),
            );
            kuva.user = userResponse;
          }
          return kuva;
        }),
    );
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const useSingleMedia = (id) => {
  console.log('usesingle', id);
  const [data, setData] = useState(null);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'media/' + id);
    const item = await response.json();

    if (localStorage.getItem('token') !== null) {
      const userResponse = await getUser(
          item.user_id,
          localStorage.getItem('token'),
      );
      item.user = userResponse;
    }
    console.log('itemi', item);
    setData(item);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const useAllComments = (fileId) => {
  const [data, setData] = useState([]);

  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'comments/file/' + fileId);
    const json = await response.json();

    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(
        json.map(async (item) => {
          console.log('iTENM', item);
          // const response = await fetch(baseUrl + 'comments/file/' + fileId);
          // const kuva = await response.json();

          // hae avatar kuva.user_id:n avulla
          // eslint-disable-next-line
          const response2 = await fetch(
              baseUrl + 'tags/Havatar_' + item.user_id,
          );
          const avatar = await response2.json();
          console.log('avat', avatar);
          // lisää avatar kuvaan
          item.avatar = avatar;

          // jos on token niin näkee muiden nimet
          if (localStorage.getItem('token') !== null) {
            const userResponse = await getUser(
                item.user_id,
                localStorage.getItem('token'),
            );
            item.user = userResponse;
          }
          return item;
        }),
    );
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};
//     if (localStorage.getItem('token') !== null) {
//       const users = Promise.all(json.map(async (item) => {
//         const userResponse = await getUser(item.user_id, localStorage.getItem('token'));
//         users.user = await userResponse;
//         console.log('usres', users);
//       },
//       ));
//     }
//     setData(json);
//   };
//   useEffect(() => {
//     fetchUrl();
//     console.log('fetchUrl');
//   }, []);
//   return data;
// };

const getAvatarImage = async (id) => {
  console.log('ai', id);
  const response = await fetch(baseUrl + 'tags/Havatar_' + id);
  return await response.json();
};

const useAllAvatars = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/Havatar_');
    const json = await response.json();
    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const kuva = await response.json();

          // hae avatar kuva.user_id:n avulla
          const response2 = await fetch(baseUrl + 'tags/Havatar_' + kuva.user_id);
          const avatar = await response2.json();
          // lisää avatar kuvaan
          kuva.avatar = avatar;

          // jos on token niin näkee muiden nimet
          if (localStorage.getItem('token') !== null) {
            const userResponse = await getUser(
                kuva.user_id,
                localStorage.getItem('token'),
            );
            kuva.user = userResponse;
          }

          return kuva;
        }),
    );

    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'login', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkUserAvailable = async (name) => {
  try {
    const response = await fetch(baseUrl + 'users/username/' + name);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  // console.log('HALOOOO', token);
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/user', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateProfile = async (inputs, token) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

// eslint-disable-next-line camelcase
const addTag = async (file_id, tag, token) => {
  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      file_id,
      tag,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  try {
    const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
    const tagJson = await tagResponse.json();
    return tagJson;
  } catch (e) {
    throw new Error(e.message);
  }
};

const delTag = async (id) => {
  const tagOptions = {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const tagResponse = await fetch(baseUrl + 'tags/', tagOptions);
    const tagJson = await tagResponse.json();
    return tagJson;
  } catch (e) {
    throw new Error(e.message);
  }
};

const upload = async (inputs, token, tag) => {
  const fd = new FormData();
  fd.append('title', inputs.title);
  fd.append('description', inputs.description);
  fd.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: fd,
    headers: {
      'x-access-token': token,
    },
  };
  console.log(fetchOptions);
  try {
    const response = await fetch(baseUrl + 'media', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    // lisää tägi mpjakk
    console.log('jOOOO', tag);
    const tagJson = addTag(json.file_id, tag, token);
    return {json, tagJson};
  } catch (e) {
    throw new Error(e.message);
  }
};

const comment = async (inputs, token) => {
  const fd = new FormData();
  fd.append('file_id', inputs.file_id);
  fd.append('comment', inputs.comment);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  console.log(fetchOptions);
  try {
    const response = await fetch(baseUrl + 'comments', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
  } catch (e) {
    throw new Error(e.message);
  }
};

const favourite = async (file_id, token) => {
  const fetchOptions = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(file_id),
  };
  console.log(fetchOptions);
  try {
    const favResponse = await fetch(baseUrl + 'favourites', fetchOptions);
    const favJson = await favResponse.json();
    return favJson;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFavourites = async (id, token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  console.log('jeeueueuryryryr', fetchOptions);
  try {
    const response = await fetch(baseUrl + 'favourites/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUser = async (id, token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return await json;
  } catch (e) {
    // throw new Error(e.message);
  }
};

const deleteFile = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const modifyFile = async (inputs, id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

// this is for groups
// create groups
const createGroup = async (inputs, token) => {
  const fd = new FormData();
  fd.append('title', inputs.title);
  fd.append('description', inputs.description);
  fd.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: fd,
    headers: {
      'x-access-token': token,
    },
  };
  console.log(fetchOptions);
  try {
    const response = await fetch(baseUrl + 'media', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    // add tag haunderGroup
    const tagJson = addTag(json.file_id, 'haunderGroup', token);
    return {json, tagJson};
  } catch (e) {
    throw new Error(e.message);
  }
};

// get groups
const getGroups = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  console.log('alalalaalal', fetchOptions);
  try {
    const response = await fetch(baseUrl + 'favourites', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

// fetch all groups
const useAllGroups = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    // haetaan ryhmät tagilla
    const response = await fetch(baseUrl + 'tags/haunderGroup');
    const json = await response.json();

    // fetch individual groups
    const items = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const kuva = await response.json();

          return kuva;
        }),
    );

    console.log('ALLAHU', items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

// delete groups
const deleteGroup = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(
        baseUrl + 'favourites/file/' + id,
        fetchOptions,
    );
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const useMyGroups = (tag) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/' + tag);
    const json = await response.json();

    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const kuva = await response.json();

          // hae omat ryhmät
          if (tag !== null) {
            const groupResponse = await getGroups(
                kuva.file_id,
                localStorage.getItem('token'),
            );
            kuva.group = groupResponse;
            console.log('Group response', groupResponse);
          }

          return kuva;
        }),
    );
    console.log('items', items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

export {
  useAllMedia,
  useSingleMedia,
  useAllComments,
  register,
  login,
  checkUserAvailable,
  checkToken,
  getAvatarImage,
  updateProfile,
  upload,
  comment,
  favourite,
  getFavourites,
  addTag,
  getUser,
  useMyGroups,
  deleteFile,
  modifyFile,
  createGroup,
  getGroups,
  useAllGroups,
  deleteGroup,
  delTag,
  useAllAvatars,
};
