const add = document.querySelector('#add');

const socket = io('/realtime');

socket.on('server:welcome-client', (id) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'fa-solid fa-hand',
    title: `Welcome user ${id.slice(0, 7)}!`,
    showConfirmButton: false,
    timer: 3000,
  });
});

socket.on('server:new-client', (id) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: `New user: ${id.slice(0, 7)}`,
    showConfirmButton: false,
    timer: 3000,
  });
});
