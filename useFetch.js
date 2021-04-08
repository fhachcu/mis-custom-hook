import { useEffect, useRef, useState } from "react"

export const useFetch = ( url) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data:null,
        loading: true,
        error:null,
    });

    useEffect(() => {
       return () => isMounted.current = false;
    }, [])

    useEffect(() => {
       
        setState({
            data:null,
            loading: true,
            error:null,
        })

        fetch(url)
            .then(resp => resp.json())
            .then(data =>{
                    if(isMounted.current){    
                        setState({
                            loading:false,
                            error:null,
                            data,
                        });
                    }
            })
            .catch(()=>{
                setState({
                    data:null,
                    loading: false,
                    error:'No se pudo cargar la info',
                })
            });


    }, [url])

    return state;

}

//Uso setTime para simular una demora , 
// luego mostrar y ocultar el componente, 
// de esta forma logro forzar un error 
// indicándome que no puedo setear un estado de un componente desmontado

// fetch(url)
//             .then(resp => resp.json())
//             .then(data =>{
//                 setTimeout(() => {
//                     if(isMounted.current){    
//                         setState({
//                             loading:false,
//                             error:null,
//                             data,
//                         });
//                     }else{
//                         console.log('setState no se llamó');
//                     }
//                 }, 4000);
//             })

