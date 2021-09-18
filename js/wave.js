
/*эффект волны на фотографиях (работает вместе с 
  библиотекой curtains.min.js и wave.css )*/

window.onload = () => {
	const shader = {
	vertex: `    
	#ifdef GL_ES
	precision mediump float;
	#endif  
	// those are the mandatory attributes that the lib sets
	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;
	// those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 texture0Matrix;
	// if you want to pass your vertex and texture coords to the fragment shader
	varying vec3 vVertexPosition;
	varying vec2 vTextureCoord;
	void main() {
	vec3 vertexPosition = aVertexPosition;
	gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
	
	// set the varyings
	vTextureCoord = (texture0Matrix * vec4(aTextureCoord, 0., 1.)).xy;
	vVertexPosition = vertexPosition;
	}`,
	fragment: `
	#ifdef GL_ES
	precision mediump float;
	#endif
	#define PI2 6.28318530718
	#define PI 3.14159265359
	#define TWO_PI 6.28318530718 
	#define S(a,b,n) smoothstep(a,b,n)   
	// get our varyings
	varying vec3 vVertexPosition;
	varying vec2 vTextureCoord;
	// the uniform we declared inside our javascript
	uniform float uTime;
	uniform vec2 uReso;
	uniform vec2 uMouse;
	uniform float uVolatility;
	// our texture sampler (default name, to use a different name please refer to the documentation)
	uniform sampler2D texture0;
	uniform sampler2D mapnormal; 
	void main(){
	// Coordinates     
	vec2 uv = vTextureCoord;     
	// Normalizing mouse relative with resolution
	vec2 m = uMouse / uReso;
	// Creating line with smoothstep
	float distLine = sin( ( S(m.x - .1, m.x, uv.x) - S(m.x, m.x + .1, uv.x) ) * 5. / PI2 ) / 20. * uVolatility;
	// Getting RGB colors combined with the line.
	vec3 color = vec3 ( 
	texture2D(texture0, vec2(uv.x + distLine * .8, uv.y)).r, 
	texture2D(texture0, vec2(uv.x + distLine, uv.y)).g,
	texture2D(texture0, vec2(uv.x + distLine, uv.y)).b);
	gl_FragColor = vec4(color, 1.);           
	}
	`
};
// get our canvas wrapper
const canvasContainer = document.getElementById("canvas");
let mouse = {
	x: 0,
	y: 0
};
let lastPos = {
	x: 0,
	y: 0
};
// set up our WebGL context and append the canvas to our wrapper
const webGLCurtain = new Curtains("canvas");
// get our plane element
const planeElement = document.getElementsByClassName("plane")[0];
// set our initial parameters (basic uniforms)
const params = {
	vertexShader: shader.vertex, // our vertex shader ID
	fragmentShader: shader.fragment, // our framgent shader ID
	widthSegments: 40,
	heightSegments: 40, // we now have 40*40*6 = 9600 vertices !
	alwaysDraw: true,
	uniforms: {
		time: {
			name: "uTime", // uniform name that will be passed to our shaders
			type: "1f", // this means our uniform is a float
			value: 0
		},
		mousepos: {
			name: "uMouse",
			type: "2f",
			value: [0, 0]
		},
		resolution: {
			name: "uReso",
			type: "2f",
			value: [canvasContainer.offsetWidth, canvasContainer.offsetHeight]
		},
		volatility: {
			name: "uVolatility", // uniform name that will be passed to our shaders
			type: "1f", // this means our uniform is a float
			value: 1
		}
	}
};
const lerp = (a, b, n) => {
	return n * (a - b) + b;
};
const map = (value, low1, high1, low2, high2) => {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
const plane = webGLCurtain.addPlane(planeElement, params);
let start = performance.now();
plane.onRender(() => {
	let now = performance.now();
	const d = getDistance(mouse, lastPos) / (now - start);
	const volatility = map(d, 1, 100, 1, 100);    
	plane.uniforms.volatility.value = lerp(
	volatility,
	plane.uniforms.volatility.value,
	0.1
	);
	lastPos.x = mouse.x;
	lastPos.y = mouse.y;
	start = now;
	plane.uniforms.time.value += 0.01; // update our time uniform value
	plane.uniforms.resolution.value = [canvasContainer.offsetWidth, canvasContainer.offsetHeight];
});
const getDistance = (v1, v2) => {
	const x = v1.x - v2.x;
	const y = v1.y - v2.y;
	return Math.sqrt(x * x + y * y);
};
let mouse_monitor = function(e) { 
	mouse.x = e.clientX - canvasContainer.getBoundingClientRect().left;
	mouse.y = e.clientY - canvasContainer.getBoundingClientRect().top;  
	plane.uniforms.mousepos.value[0] = lerp(
	mouse.x,
	plane.uniforms.mousepos.value[0],
	0.1
	);
	plane.uniforms.mousepos.value[1] = lerp(
	mouse.y,
	plane.uniforms.mousepos.value[1],
	0.1
	);
};  
canvasContainer.addEventListener("mousemove", mouse_monitor); 
};