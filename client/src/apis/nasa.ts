export async function get_data_from_nasa(){
        try{
            const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", {
                method:"GET"
            });
            const headers = response.headers.entries();
            const apod_data = await response.json();
            console.log(headers);
            console.log(apod_data.title);
            return apod_data;
        }
        catch(err){
           if(err){
            return "Something went wrong at nasa api service!";
           }
        }
}