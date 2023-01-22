import React, { useState } from 'react'
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';


function SimpleLinearRegression(object) {
    let [independentValues, updateIndependentValues] = useState("")
    let [dependentValues, updateDependentValues] = useState("")
    let [numberOfDecimals,updateNumberOfDecimals]=useState(4)
    let [independent, updateIndependent] = useState([])
    let [dependent, updateDependent] = useState([])
    let [x, update_x] = useState([])
    let [y, update_y] = useState([])
    let [x2, update_x2] = useState([])
    let [y2, update_y2] = useState([])
    let [xy, update_xy] = useState([])
    let [estimated, update_estimated] = useState([])
    let [error, update_error] = useState([])
    let [mean_x, updateMean_x] = useState(0)
    let [mean_y, updateMean_y] = useState(0)
    let [slope, updateSlope] = useState(0)
    let [intercept, updateIntercept] = useState(0)
    let [correlationCoefficient, updateCorrelationCoefficient] = useState(0)
    let [input, updateInput] = useState("")
    let [sums, updateSums] = useState({
        X_sum: 0,
        Y_sum: 0,
        x_sum: 0,
        y_sum: 0,
        x2_sum: 0,
        y2_sum: 0,
        xy_sum: 0,
        estimated_sum: 0,
        error_sum: 0
    })
    function checkInput(x, y) {
        x = x.trim().replace(/[,\n]+$|^[,\n]+/, "")
        y = y.trim().replace(/[,\n]+$|^[,\n]+/, "")
        if (x !== "" && y !== "" && x.split(/[\s,\n]+/).length > 0 && x.split(/[\s,\n]+/).length === y.split(/[\s,\n]+/).length) {
            x = x.split(/[\s,\n]+/)
            y = y.split(/[\s,\n]+/)
            try {
                let float_X = []
                x.forEach(element => {
                    float_X.push(parseFloat(element))
                });
                let float_Y = []
                y.forEach(element => {
                    float_Y.push(parseFloat(element))
                });
                updateIndependent(float_X)
                updateDependent(float_Y)
                calculate(float_X, float_Y)
            } catch (error) {
                window.alert("some error is occurred")
            }
        } else {
        }

    }
    function calculate(X, Y) {
        let X_sum = 0, Y_sum = 0, x_mean = 0, y_mean = 0;
        X.forEach(element => {
            X_sum += element;
        })
        x_mean = X_sum / X.length
        updateMean_x(x_mean)

        Y.forEach(element => {
            Y_sum += element;
        });
        y_mean = Y_sum / Y.length
        updateMean_y(y_mean)

        let x_ = [], x_sum = 0, x2_ = [], x2_sum = 0;
        X.forEach((value) => {
            x_.push(value - x_mean)
            x2_.push((value - x_mean) * (value - x_mean))
            x_sum += value - x_mean
            x2_sum += (value - x_mean) * (value - x_mean)
        })
        update_x(x_)
        update_x2(x2_)
        let y_ = [], y_sum = 0, y2_ = [], y2_sum = 0;
        Y.forEach((value) => {
            y_.push(value - y_mean)
            y2_.push((value - y_mean) * (value - y_mean))
            y_sum += value - y_mean
            y2_sum += (value - y_mean) * (value - y_mean)
        })
        update_y(y_)
        update_y2(y2_)
        let xy_sum = 0, xy_ = []
        x_.forEach((element, index) => {
            xy_.push(element * y_[index])
            xy_sum += element * y_[index]
        });
        update_xy(xy_)
        let slope_ = (X.length * xy_sum - x_sum * y_sum) / (X.length * x2_sum - x_sum * x_sum)
        updateSlope(slope_)
        let intercept_ = y_mean - slope_ * x_mean
        updateIntercept(intercept_)
        updateCorrelationCoefficient((xy_sum) / (Math.sqrt(x2_sum * y2_sum)))

        let estimated_ = [], estimated_sum = 0;
        X.forEach((value) => {
            estimated_.push(slope_ * value + intercept_)
            estimated_sum += slope_ * value + intercept_
        })
        update_estimated(estimated_)

        let absolute_Error = [], error_sum = 0;
        Y.forEach((value, index) => {
            absolute_Error.push(Math.abs(estimated_[index] - value))
            error_sum += Math.abs(estimated_[index] - value)
        })
        update_error(absolute_Error)
        updateSums({
            ...sums,
            X_sum,
            Y_sum,
            x_sum,
            y_sum,
            x2_sum,
            y2_sum,
            xy_sum,
            estimated_sum,
            error_sum
        })
    }
    return (
        <div className='RegressionContainer'>
            <i className="fa fa-arrow-left" onClick={() => object.goBack()}> Go back</i>
            <div className="inputContainer">
                <h1>Simple Linear Regression</h1>

                <p className="info">
                    In statistics, simple linear regression is a linear regression model with a single explanatory variable.That is, it concerns two-dimensional sample points with one independent variable and one dependent variable (conventionally, the x and y coordinates in a Cartesian coordinate system) and finds a linear function (a non-vertical straight line) that, as accurately as possible, predicts the dependent variable values as a function of the independent variable. The adjective simple refers to the fact that the outcome variable is related to a single predictor.
                </p>
                <h3>Formulas we use</h3>
                <div className="info">
                    <div>
                        <BlockMath math={'\\overline Y=\\frac{\\sum Y}{N} '} />
                    </div>
                    <div>
                        <BlockMath math={'\\overline X=\\frac{\\sum X}{N} '} />
                    </div>
                    <div>
                        <div>Equation of Line</div>
                        <BlockMath math={'Y=mX+c '} />
                    </div>
                    <div>
                        <BlockMath math={'m=\\frac{N\\sum xy-\\sum x \\sum y}{N\\sum x^2-(\\sum x)^2}'} />
                    </div>
                    <div>
                        <BlockMath math={'r= \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}}'} />
                    </div>
                    <div>
                        <BlockMath math={'c=\\overline{Y}-m\\overline{X}'} />
                    </div>
                    <div>
                        <div>Equation of Regression</div>
                        <BlockMath math={'H(X)=mX+c '} />
                    </div>
                    <div>
                        <BlockMath math={'A.E.=H(X)-Y'} />
                    </div>
                    <div>
                        <li>m = slope</li>
                        <li>X = Independent Variable</li>
                        <li>Y = Dependent Variable</li>
                        <li>c = Intercept</li>
                        <li>r = Correlation Coefficient</li>
                        <li>A.E. = Absolute Error</li>
                        <li><BlockMath math={'\\overline{Y}'} />
                            = Mean of Independent Variable(Y)</li>
                        <li><BlockMath math={'\\overline{X}'} />
                            = Mean of Dependent Variable(X)</li>
                    </div>
                </div>
                <div className="inputs">
                    <label htmlFor="independent">Enter Independent Variable(X)</label>
                    <textarea value={independentValues} onChange={async (event) => {
                        updateIndependentValues(event.target.value)
                        checkInput(event.target.value, dependentValues)
                    }} name="independent" id="independent"></textarea>
                    <label htmlFor="dependent">Enter Dependent Variable(Y)</label>
                    <textarea value={dependentValues} onChange={async (event) => {
                        updateDependentValues(event.target.value)
                        checkInput(independentValues, event.target.value)
                    }} name="dependent" id="dependent" ></textarea>
                    <label htmlFor="decimals">Change Number of Decimals (Default is 4, minimum 0 and maximum 5)</label>
                    <input type="number" max={10} min={0} value={numberOfDecimals} onChange={(event)=>{
                        if (parseInt(event.target.value)<0 || parseInt(event.target.value)>5 ) {
                            window.alert("Why are you choosing this 😡")
                            updateNumberOfDecimals(0)
                        } else {
                            updateNumberOfDecimals(parseInt(event.target.value))
                        }
                        }} name="decimal" id="decimal " />
                    <p>Enter values with space separated,comma separated or new line separated (of your choice)</p>
                    <p>We uses  Karl Pearson Coefficient of Correlation</p>
                    <p>All Values will be adjusted to 4 decimal places</p>
                    <p>Only representational values will get fixed, but final value will be calculated on actual decimal values</p>
                </div>

            </div>
            {
                dependent.length === independent.length && dependent.length > 1 ? (
                    <>
                        <div className="OutputContainer">
                            <h1>Output</h1>
                            <div className='TableScrollbar'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th><InlineMath math={'X'} /></th>
                                            <th><InlineMath math={'Y'} /></th>
                                            <th><InlineMath math={'x=X-\\overline X'} /></th>
                                            <th><InlineMath math={'y=Y-\\overline Y'} /></th>
                                            <th><InlineMath math={'x^2'} /></th>
                                            <th><InlineMath math={'y^2'} /></th>
                                            <th><InlineMath math={'xy'} /></th>
                                            <th>Estimated=H(X)</th>
                                            <th>Absolute Error</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dependent.map((_, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{independent[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{dependent[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{x[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{y[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{x2[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{y2[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{xy[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{estimated[index].toFixed(numberOfDecimals)}</td>
                                                        <td>{error[index].toFixed(numberOfDecimals)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Sum <InlineMath math={'\\sum'} /></th>
                                            <th>{sums.X_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.Y_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.x_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.y_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.x2_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.y2_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.xy_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.estimated_sum.toFixed(numberOfDecimals)}</th>
                                            <th>{sums.error_sum.toFixed(numberOfDecimals)}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="calculations">
                                <h4>Mean of Independent Variable (X)</h4>
                                <div className='operation'>
                                    <BlockMath math={'\\overline X=\\frac{\\sum X}{N}'} />
                                    <BlockMath math={`=\\frac{\\sum ${sums.X_sum.toFixed(numberOfDecimals)}}{${dependent.length}}`} />
                                    <BlockMath math={`=${mean_x.toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Mean of Dependent Variable (Y)</h4>
                                <div className='operation'>
                                    <BlockMath math={'\\overline Y=\\frac{\\sum Y}{N} '} />
                                    <BlockMath math={`=\\frac{\\sum ${sums.Y_sum.toFixed(numberOfDecimals)}}{${dependent.length}}`} />
                                    <BlockMath math={`=${mean_y.toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Slope</h4>
                                <div className='operation'>
                                    <BlockMath math={'m=\\frac{N\\sum xy-\\sum x \\sum y}{N\\sum x^2-(\\sum x)^2}'} />
                                    <BlockMath math={`=\\frac{${dependent.length}*${sums.xy_sum.toFixed(numberOfDecimals)}-${sums.x_sum.toFixed(numberOfDecimals)}*${sums.y_sum.toFixed(numberOfDecimals)}}{${dependent.length}*${sums.x2_sum.toFixed(numberOfDecimals)}-${sums.x_sum.toFixed(numberOfDecimals)}^2}`} />
                                    <BlockMath math={`=${slope.toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Intercept</h4>
                                <div className='operation'>
                                    <BlockMath math={'c=\\overline{Y}-m\\overline{X}'} />
                                    <BlockMath math={`=${mean_y.toFixed(numberOfDecimals)}-${slope.toFixed(numberOfDecimals)}*${mean_x.toFixed(numberOfDecimals)}`} />
                                    <BlockMath math={` =${intercept.toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Corelation Coefficient</h4>
                                <div className='operation'>
                                    <BlockMath math={'r= \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}}'} />
                                    <BlockMath math={`= \\frac{${sums.xy_sum.toFixed(numberOfDecimals)}}{\\sqrt{${sums.x2_sum.toFixed(numberOfDecimals)}*${sums.y2_sum.toFixed(numberOfDecimals)}}}`} />
                                    <BlockMath math={` =${correlationCoefficient.toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Regression Equation</h4>
                                <div className='operation'>
                                    <BlockMath math={`H(X)=${slope.toFixed(numberOfDecimals)}X+${intercept.toFixed(numberOfDecimals)}`} />

                                </div>
                                <hr />
                                <h4>Mean Absolute Error (MAE)</h4>
                                <div className='operation'>
                                    <BlockMath math={`MAE=\\frac{\\sum A.E.}{N}`} />
                                    <BlockMath math={`=\\frac{${sums.error_sum.toFixed(numberOfDecimals)}}{${dependent.length}}`} />
                                    <BlockMath math={` =${(sums.error_sum / dependent.length).toFixed(numberOfDecimals)}`} />

                                </div>
                                <hr />
                                <h4>Root Mean Square Error (RMSE)</h4>
                                <div className='operation'>
                                    <BlockMath math={`RMSE=\\sqrt{\\frac{\\sum A.E.^2}{N}}`} />
                                    <BlockMath math={`=\\sqrt{\\frac{${error.reduce((sum, num) => { return sum + num * num }, 0).toFixed(numberOfDecimals)}}{${dependent.length}}}`} />
                                    <BlockMath math={` =${(Math.sqrt(error.reduce((sum, num) => { return sum + num * num }, 0) / dependent.length)).toFixed(numberOfDecimals)}`} />
                                </div>
                                <hr />
                                <h4>Value Estimation</h4>
                                <div className="operation">
                                    <input type="number" name="number" value={input} onChange={(event) => updateInput(event.target.value)} id="number" placeholder='Enter Value(X)' />
                                    <button>Estimated value is: {(slope * input + intercept).toFixed(numberOfDecimals)}</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}

export default SimpleLinearRegression