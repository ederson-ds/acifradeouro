import Texto from "./Texto";

export default function Conteudo({ children, user }) {
    return (
        <div id="conteudo">
            <Texto user={user} children={children}/>
        </div>
    );
}
