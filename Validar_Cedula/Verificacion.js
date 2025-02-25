function VerificarCedula(){

    const cedula=document.getElementById('Num_cedula').value;
    const Respuesta=document.getElementById('Respuesta');

    if(cedula.length !== 11 || !/^\d+$/.test(cedula)){
        Respuesta.textContent = "Cédula inválida: debe contener 11 dígitos numéricos.";
        Respuesta.className = "invalid";
        return;
    }
    
    const digito_Verificador=parseInt(cedula[10]);
    
    
    let suma1=0, suma2=0, suma_Total=0;
    
    for(let num=9; num>=0; num--){
        
        let digito=parseInt(cedula[num]);
        
        if(num%2!=0){
            if((digito*2)>=10){
                suma1+=(digito*2)-9;
            }else{
                suma1+=digito*2;
            }
        }else {
            suma2+=digito;
        }
        
    }
    
    
    suma_Total=suma1+suma2;
    
    let modulo = 0;
        if((suma_Total%10)!=0){
            modulo+=(10-(suma_Total%10));
        }else{
            modulo+=0
        }
        
    Respuesta.textContent = (10-(suma_Total%10));
    
    if(modulo==digito_Verificador){
        Respuesta.textContent = "Cédula Valida";
        Respuesta.className = "valida";
        Respuesta.style.color="GREEN";
    }else{
        Respuesta.textContent = "Cédula inválida ";
        Respuesta.className = "invalida";
        Respuesta.style.color="RED";
    }
}
