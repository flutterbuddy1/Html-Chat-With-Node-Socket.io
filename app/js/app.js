
        const socket = io("ws://192.168.1.160:5000", { transports: ["websocket"] });
        var user = prompt("Enter Your Name");
        socket.on("connect", () => {
            socket.emit("join", user);
            console.log("connected Now");
        });
        socket.on("joined", (data) => {
            document.getElementById("status").innerHTML = data + " Joined" ;
        });
        socket.on("connected", (d) => {
            document.getElementById("status").innerHTML = d;
        });
        socket.on("message", (d) => {
            // console.log(Object.entries(d));
            var msg = document.createElement("p");
            var container = document.createElement("p");
            if(d.id == user){
                container.className="left";
                msg.innerHTML = d.id + " : " + d.msg;
            }else{
                msg.innerHTML = "Me: " + d.msg ;
                container.className="right";
            }
            container.appendChild(msg);
            document.getElementById("messages").appendChild(container);
            document.getElementById('messages').scrollTo(0,1e10);

            // d.split("\n");
        });
        const msg = document.getElementById("msg");
        const id = document.getElementById("id");
        const send = document.getElementById("send");
        var form = document.getElementById('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(msg.value != ""){
                socket.emit("message", {
                    id: id.value,
                    msg: msg.value
                });
                msg.value = "";
                console.log( document.getElementById('messages').scrollHeight);
            }
        });