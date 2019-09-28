const url = 'http://165.22.60.22/api/v1/contacts';

export const fetchContacts = () => {
  return(
    fetch(url)
    .then((res) => res.json())
  );
}

export const fetchContact = id => {
  return(
    fetch(url+'/'+id)
    .then((res) => res.json())
  );
}
