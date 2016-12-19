function BenchMarkInit(){

	var _ExtensionName = 'ET-BenchMark';

	var jsFiles = [];
    jsFiles.push('Extensions/' + _ExtensionName + '/graph-benchmark.js');

    for (var i = 0; i < jsFiles.length; i++) {

    	var url = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + jsFiles[i];

    	Qva.LoadScript(url,function(){
    		Qva.AddExtension("ET-BenchMark",function(){

			    var _LoadUrl = Qva.Remote + '?public=only' + '&name=';

			    // Define one or more styles sheets to be used within the extension
			    var cssFiles = [];
			    cssFiles.push('Extensions/' + _ExtensionName + '/graph-benchmark.css');
			    for (var i = 0; i < cssFiles.length; i++) {
			    	var url = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + cssFiles[i];
			    	Qva.LoadCSS(url);
			    }

				var html = '';
				html += '<div id="graph"></div><div id="graph-2"></div>';
			    this.Element.innerHTML = html;

				window.graphBenchmark = graphBenchmark;

				var graph = graphBenchmark;
				
				graph.init({
					canvas: document.getElementById( 'graph' ),
					title: this.Layout.Text1.text,
					hasComparison: true,
					comparisonColor: '#4bb96d',
					benchmarkLabel: 'Benchmark',
					benchmarkValue: 1000000,
					actualLabel: 'Actual',
					actualValue: 500000,
					valuePrepend: '$',
					valueAppend: '',
					colorOver: '#e74c3c', // Color for actual value OVER benchmark
					colorUnder: this.Layout.Text0.text // Color for actual value UNDER benchmark
				});
				
				var graphTwo = graphBenchmark;
				
				graphTwo.init({
					canvas: document.getElementById( 'graph-2' ),
					title: this.Layout.Text2.text,
					hasComparison: false,
					benchmarkLabel: 'Benchmark',
					benchmarkValue: .02,
					benchmarkGradient: '#6a808c, #9da4ad',
					actualLabel: 'Actual',
					actualValue: .04,
					actualColor: '#e74c3c',
					valuePrepend: '',
					valueAppend: '%',
					maxValue: 0.1, // Use maxValue to offset 100% height
					colorOver: '#e74c3c',
					colorUnder: '#4bb96d'
				});
			});
    	});
    }
}
BenchMarkInit();