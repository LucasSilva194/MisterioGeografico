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

// função remover desafio

function removerDesafio(desafioId) {
    let desafios = JSON.parse(localStorage.getItem('desafios'));
  
    // Verificar se o desafio existe no array
    const desafioExistente = desafios.find(desafio => desafio.id === desafioId);
  
    if (!desafioExistente) {
      swal.fire({
        title: "Ups!",
        text: "Desafio não encontrado!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top',
        timerProgressBar: true
      });
      return; // Encerrar a função se o desafio não for encontrado
    }
  
    // Filtrar o array para excluir o desafio com o desafioId fornecido
    desafios = desafios.filter(desafio => desafio.id !== desafioId);
  
    // Armazenar o array atualizado no localStorage
    localStorage.setItem('desafios', JSON.stringify(desafios));
  
    swal.fire({
      title: "Sucesso",
      text: "Desafio removido com sucesso",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: 'top',
      timerProgressBar: true
    });
  }
  
  
  document.querySelector('#removerDesafio').addEventListener("keydown", function(e) {
    if(e.key === 'Enter') {
      removerDesafio(e.target.value);
    }
  });
  






