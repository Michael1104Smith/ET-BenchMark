;(function () {
	
	var graphBenchmark = {
		
		
			_utilities: {
				
				minInArray: function( array ) {
					
					var value;
					
					for ( i = 0; i < array.length; i++ ) {
						
						if ( i == 0 ) {
							value = array[ i ];
						}
						else {
							
							if ( value > array[ i ] ) {
								
								value = array[ i ];
							}
						}
						
					}
					
					return value;
					
				},
				
				maxInArray: function( array ) {
					
					var value;
					
					for ( i = 0; i < array.length; i++ ) {
						
						if ( i == 0 ) {
							value = array[ i ];
						}
						else {
							
							if ( value < array[ i ] ) {
								
								value = array[ i ];
							}
						}
						
					}
					
					return value;
					
				},
				
				formatCurrency: function ( nStr ) {
					nStr += '';
					x = nStr.split('.');
					x1 = x[0];
					x2 = x.length > 1 ? '.' + x[1] : '';
					var rgx = /(\d+)(\d{3})/;
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
					}
					return x1 + x2;
				}
					
			},
			
			_writeColumnElements: function ( label, value, valuePrepend, valueAppend, color ) {
				
				var self = this,
					li = document.createElement( 'li' ),
					labelElement = document.createElement( 'label' ),
					valueElement = document.createElement( 'span' ),
					graphic = document.createElement( 'span' );
				
				li.className = 'graph-bar';
				
				li.setAttribute( 'data-value', value );
				
				labelElement.className = 'graph-bar-label';
				labelElement.innerHTML = label;
				
				li.appendChild( labelElement );
				
				valueElement.className = 'graph-bar-value';
				
				valueElement.innerHTML = valuePrepend;
				
				valueElement.innerHTML += valuePrepend == '$' ? self._utilities.formatCurrency( value ) : value;
				
				valueElement.innerHTML += valueAppend;
				
				li.appendChild( valueElement );
				
				graphic.className = 'graph-bar-graphic';
				
				for ( i=0; i<20; i++ ) {
					var span = document.createElement( 'span');
					
					graphic.appendChild( span );
				}
				
				li.appendChild( graphic );
					
				return li;
				
			},
		
			_writeElements: function () {
				
				var self = this,
					figure = document.createElement( 'figure' ),
					h1 = document.createElement( 'h1' ),
					ul = document.createElement( 'ul' ),
					columnValues = [ self.options.benchmarkValue, self.options.actualValue ],
					columnMinValue,
					columnMaxValue,
					columnBenchmark = self._writeColumnElements( self.options.benchmarkLabel, self.options.benchmarkValue, self.options.valuePrepend, self.options.valueAppend, self.options.benchmarkColor ),
					columnActual = self._writeColumnElements( self.options.actualLabel, self.options.actualValue, self.options.valuePrepend, self.options.valueAppend, self.options.actualColor ),
					columnMinHeight,
					columnMaxHeight;
				
				figure.className = 'graph-benchmark';
				
				if ( self.options.benchmarkValue > self.options.actualValue ) {
					figure.classList.add( 'graph-benchmark--under' );
				}
				else if ( self.options.benchmarkValue < self.options.actualValue ) {
					figure.classList.add( 'graph-benchmark--over' );
				}
				
				columnBenchmark.classList.add( 'graph-bar--benchmark' );
				
				ul.appendChild( columnBenchmark );
				
				columnActual.classList.add( 'graph-bar--actual' );
				
				ul.appendChild( columnActual );
				
				
				columnMinValue = self._utilities.minInArray( columnValues );
				
				columnMaxValue = self._utilities.maxInArray( columnValues );
				
				
				if ( self.options.hasComparison ) {
					figure.classList.add( 'graph-benchmark--has-comparison' );
					
					var li = document.createElement( 'li' ),
						em = document.createElement( 'em' );
					
					li.className = 'graph-comparison';
					
					em.innerHTML = Math.ceil( 100 - ( ( columnMinValue / columnMaxValue ) * 100 ) ) + '%';
					
					li.appendChild( em );
					
					li.innerHTML += self.options.benchmarkValue > self.options.actualValue ? ' Under' : ' Over';
					
					li.innerHTML += ' Benchmark';
					
					
					li.style.color = self.options.comparisonColor;
					
					
					ul.appendChild( li );
				}
				
				h1.className = 'graph-title';
				
				h1.innerHTML = self.options.title;
				
				figure.appendChild( h1 );
				
				figure.appendChild( ul );
				
				self.options.canvas.appendChild( figure );
				
				var spans = figure.querySelectorAll( '.graph-bar--actual .graph-bar-graphic span' ),
					spansLength = spans.length;
				
				if ( figure.classList.contains( 'graph-benchmark--over' ) ) {
					
					figure.querySelector( '.graph-bar--actual .graph-bar-value' ).style.color = self.options.colorOver;
					
					while ( spansLength-- ) {
						spans[ spansLength ].style.backgroundColor = self.options.colorOver;
					}
				}
				else if ( figure.classList.contains( 'graph-benchmark--under' ) ) {
					
					while ( spansLength-- ) {
						spans[ spansLength ].style.backgroundColor = self.options.colorUnder;
					}
				}
				
				
				if ( self.options.maxValue ) {
					
					columnMaxHeight = ( columnMaxValue / self.options.maxValue ) * 100;
					
					columnMinHeight = ( columnMinValue / self.options.maxValue ) * 100 > 5 ? ( columnMinValue / self.options.maxValue ) * 100 : 5;
				}
				else {
					columnMaxHeight = 100;
					
					columnMinHeight = ( columnMinValue / columnMaxValue ) * 100 > 5 ? ( columnMinValue / columnMaxValue ) * 100 : 5;
					
				}
				
				document.querySelector( '[data-value="' + columnMaxValue + '"] .graph-bar-graphic' ).style.height =  columnMaxHeight + '%';
				
				document.querySelector( '[data-value="' + columnMaxValue + '"] .graph-bar-value' ).style.bottom =  columnMaxHeight + '%';
				
					
				document.querySelector( '[data-value="' + columnMinValue + '"] .graph-bar-graphic' ).style.height =  columnMinHeight + '%';
					
				document.querySelector( '[data-value="' + columnMinValue + '"] .graph-bar-value' ).style.bottom =  columnMinHeight + '%';
				
			},
			
			init: function ( options ) {
				
				var self = this;
				
				self.options = options;
				
				self.canvas = options.canvas;
				
				self._writeElements();
				
			}
	};
	
	
	window.graphBenchmark = graphBenchmark;
	
	
})();