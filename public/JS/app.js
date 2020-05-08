const weatherform = document.querySelector('form');
const search = document.querySelector('input');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const loc = search.value;
    fetch('/weather/?address='+loc).then((res)=>{
        document.querySelector('#location').textContent='Loading...';
        document.querySelector('#forecast').textContent='';
    res.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error+" :(");
            document.querySelector('#location').textContent=data.error;
            document.querySelector('#location').classList.add('err');
        } else{
            console.log(data.Location);
            console.log(data.forecast);
            document.querySelector('#location').classList.remove('err');
            document.querySelector('#location').textContent=data.Location;
            f = document.querySelector('#forecast');
            f.textContent=data.forecast;
        }
    })
  })
})