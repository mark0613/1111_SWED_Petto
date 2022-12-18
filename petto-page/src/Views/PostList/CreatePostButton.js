import {
    Button,
    Image,
} from "antd";

function CreatePostButton() {
    return (
        <>
            <div
                id="button"
                style={{
                    textAlign: "center",
                    margin: 5,
                }}
            >
                <Button
                    className="btn"
                    style={{
                        color: 'white',
                        width: '70px',
                        height: '50px',
                        borderRadius: '8px',
                        margin: 10,
                        backgroundColor: '#c4e5ff',
                        border: '1px solid #306fc7',
                    }}
                    onClick={ () => window.location.href = '/post/new/text' }
                >
                    <Image 
                        src="https://cdn-icons-png.flaticon.com/512/1170/1170221.png"
                        preview={ false }
                        width={ 35 }
                    />
                </Button>
    
                <Button
                    className="btn"
                    style={{
                        color: 'white',
                        width: '70px',
                        height: '50px',
                        borderRadius: '8px',
                        margin: 10,
                        backgroundColor: '#c4e5ff',
                        border: '1px solid #306fc7',
                    }}
    
                    onClick={ () => window.location.href = '/post/new/md' }
                >
                    <Image 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Octicons-markdown.svg/600px-Octicons-markdown.svg.png"
                        preview={ false }
                        width={ 35 }
                    />
                </Button>
    
                <Button
                    className="btn"
                    style={{
                        color: 'white',
                        width: '70px',
                        height: '50px',
                        borderRadius: '8px',
                        margin: 10,
                        backgroundColor: '#c4e5ff',
                        border: '1px solid #306fc7',
                    }}
                    onClick={ () => window.location.href = '/post/new/vote' }
                >
                    <Image 
                        src="https://cdn-icons-png.flaticon.com/512/3179/3179218.png"
                        preview={ false }
                        width={ 35 }
                    />
                </Button>
            </div>
        </>
    );
}

export { CreatePostButton };
