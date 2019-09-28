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

export const fetchFilterByName = name => {
  return(
    fetch(url+'?name='+name)
    .then((res) => res.json())
  );
}

export const fetchFilterByRevenue = revenue => {
  return(
    fetch(url+'?revenue_gte='+revenue)
    .then((res) => res.json())
  );
}

export const fetchFilterByCompany = id => {
  return(
    fetch(url+'?company_id='+id)
    .then((res) => res.json())
  );
}
