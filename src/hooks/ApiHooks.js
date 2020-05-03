import {useState, useEffect} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useAllMedia = () => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/mpjakk');
    const json = await response.json();
    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

/* const useAllMedia = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/mpjakk');
    const json = await response.json();

    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      const kuva =  await response.json();
    // hae avatar kuva.user_id:n avulla
    const response2 =await fetch(baseUrl + 'tags/avatar_' + kuva.user_id)
    const avatar = await response2.json()
    // lisää avatar kuvaan
    kuva.avatar = avatar;
    // samalla tavalla haetaan käyttäjätiedot ja asetetaan kuva.user = haetut tiedot
    return kuva;
    }));

    console.log(items);
    setData(items);
    };

    useEffect(() => {
    fetchUrl();
    }, []);

    return data;
}; */

const useSingleMedia = (id) => {
  const [data, setData] = useState(null);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'media/' + fileid);
    const item = await response.json();
    if (localStorage.getItem('token') !== null) {
      const userResponse = await getUser(item.user_id,
          localStorage.getItem('token'));
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
  const [data, setData] = useState([fileId]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'comments/file/' + fileId);
    const items = await response.json();
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const getAvatarImage = async (id) => {
  console.log('ai', id);
  const response = await fetch(baseUrl + 'tags/avatar_' + id);
  return await response.json();
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

const upload = async (inputs, token) => {
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
    const tagJson = addTag(json.file_id, 'mpjakk', token);
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
    // lisää tägi mpjakk
    // const tagJson = addTag(json.file_id, 'mpjakk', token);
    // return {json, tagJson};
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
    return json;
  } catch (e) {
    throw new Error(e.message);
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
  addTag,
  getUser,
  deleteFile,
  modifyFile,
};
