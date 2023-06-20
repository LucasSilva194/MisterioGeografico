//função remover utilizador existente no localstorag

function removerUtilizador(userName) {
    let utilizadores = JSON.parse(localStorage.getItem('users'));
  
    // Verificar se o utilizador existe no array
    const utilizadorExistente = utilizadores.find(utilizador => utilizador.username === userName);
  
    if (!utilizadorExistente) {
        swal.fire({
            title: "Ups!",
            text: "Utilizador não Existente!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            toast: true, // Exibir como notificação flutuante
            position: 'top', // Posição superior
            timerProgressBar: true // Mostrar barra de progresso do timer
        });
      return; // Encerrar a função se o utilizador não for encontrado
    }
  
    // Filtrar o array para excluir o utilizador com o userName fornecido
    utilizadores = utilizadores.filter(utilizador => utilizador.username !== userName);
  
    // Armazenar o array atualizado no localStorage
    localStorage.setItem('users', JSON.stringify(utilizadores));
  
    swal.fire({
        title: "Sucesso",
        text: "Utilizador removido com sucesso",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        toast: true, // Exibir como notificação flutuante
        position: 'top', // Posição superior
        timerProgressBar: true // Mostrar barra de progresso do timer
    });
  }
  

document.querySelector('#remover').addEventListener("keydown", function(e) {
    if(e.key === 'Enter') {
        removerUtilizador(e.target.value);
    }
})

  






