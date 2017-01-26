$(document).on("turbolinks:load", function() {
    if ($("body").hasClass("talent-managment")) {

        var d3variable = gon.applicants;
        d3variable = d3.csv.parse(d3variable);
        console.log(d3variable);
        makeRecruitmentGraphs(d3variable);

        function makeRecruitmentGraphs(data) {
            var dateFormat = d3.time.format("%m/%d/%Y");
            data.forEach(function(d) {
                d.datecomp = dateFormat.parse(d.datecomp);
                d.hired = Number(d.hired);
                // if ((/\S/.test(d.JobTypesAppliedFor2)) && typeof d.JobTypesAppliedFor2 !== 'undefined') {
                //   d.JobTypesAppliedFor2 = d.JobTypesAppliedFor2.trim();
                // } else {
                //   d.JobTypesAppliedFor2 = "Not Given";
                // }
            });

            var ndx = crossfilter(data);

            var date = ndx.dimension(function(d) {
                return d.datecomp;
            });

            var source = ndx.dimension(function(d) {
                return "" + d.primary_recruitment_source;
            });

            var hired = ndx.dimension(function(d) {
                return "" + d.hired_yn;
            });

            var hired_count = ndx.dimension(function(d) {
                return d.hired;
            });

            var gender = ndx.dimension(function(d) {
                return "" + d.protectedgender;
            });

            var ethnicity = ndx.dimension(function(d) {
                return "" + d.signle_race;
            });

            var category = ndx.dimension(function(d) {
                return "" + d.positioncategory;
            });

            var internalexternal = ndx.dimension(function(d) {
                return "" + d.internal_external;
            });

            var certification = ndx.dimension(function(d) {
                return "" + d.fromwhichinstitutiondidyoureceiv;
            });

            var pipeline = ndx.dimension(function(d) {
                return "" + d.current_pipeline_stage;
            });

            var job = ndx.dimension(function(d) {
                return "" + d.jobtypesappliedfor;
            });

            var applicantId = ndx.dimension(function(d) {
                return "" + d.appno;
            });


            // Calculate Groups
            // var applicantsByDate = date.group();
            // var applicantsBySource = source.group();
            // var applicantsByHired = hired.group();
            // var applicantsByGender = gender.group();
            // var applicantsByEthnicity = ethnicity.group();
            // var applicantsByCategory = category.group();
            // var applicantsByInternalexternal = internalexternal.group();
            // var applicantsByCertification = certification.group();
            // var applicantsByPipeline = pipeline.group();
            var applicantsByJob = job.group();

            var all = ndx.groupAll();

            // Date reduce function
            var applicantsByDate = date.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Pipeline reduce function
            var applicantsByPipeline = pipeline.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Source reduce function
            var applicantsBySource = source.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Certification reduce function
            var applicantsByCertification = certification.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Pipeline reduce function
            var applicantsByPipeline = pipeline.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );


            // Category reduce function
            var applicantsByCategory = category.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Ethnicity reduce function
            var applicantsByEthnicity = ethnicity.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Gender reduce function
            var applicantsByGender = gender.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Internal External reduce function
            var applicantsByInternalexternal = internalexternal.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );

            // Hired reduce function
            var applicantsByHired = hired.group().reduce(
                function(p, d) {
                    if (d.appno in p.applications) p.applications[d.appno]++;
                    else {
                        p.applications[d.appno] = 1;
                        p.applicationCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applications[d.appno]--;
                    if (p.applications[d.appno] === 0) {
                        delete p.applications[d.appno];
                        p.applicationCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicationCount: 0,
                        applications: {}
                    };
                }
            );


            // Didn't get hired to work
            var totalHired = hired.group().reduceSum(function(d) {
                return d.hired;
            })

            // Count the unique applicants
            var totalApplicants = ndx.groupAll().reduce(
                function(p, d) {
                    if (d.appno in p.applicationId) p.applicationId[d.appno]++;
                    else {
                        p.applicationId[d.appno] = 1;
                        p.applicantCount++;
                    }
                    return p;
                },

                function(p, d) {
                    p.applicationId[d.appno]--;
                    if (p.applicationId[d.appno] === 0) {
                        delete p.applicationId[d.appno];
                        p.applicantCount--;
                    }
                    return p;
                },

                function() {
                    return {
                        applicantCount: 0,
                        applicationId: {}
                    };
                }
            );

            // Charts
            // lineChart() numberDisplay() rowChart() pieChart()
            applicantsNumber = dc.numberDisplay("#total-applicants");
            // hiredNumber = dc.numberDisplay("#total-hired");
            pipelineChart = dc.rowChart("#pipeline-chart");
            dateChart = dc.lineChart("#date-chart");
            sourceChart = dc.rowChart("#source-chart");
            hiredChart = dc.pieChart("#hired-chart");
            genderChart = dc.pieChart("#gender-chart");
            ethnicityChart = dc.rowChart("#ethnicity-chart");
            positionChart = dc.rowChart("#position-chart");
            internalExternalChart = dc.rowChart("#internal-external-chart");
            certificationChart = dc.rowChart("#certification");

            dc.selectMenu('#menuselect')
                .multiple(false)
                .promptText("All Applications")
                .dimension(job)
                .group(applicantsByJob);

            dc.dataCount("#row-selection")
                .dimension(ndx)
                .group(all);

            applicantsNumber
                .formatNumber(d3.format("d"))
                .valueAccessor(function(d) {
                    console.log(d);
                    return d.applicantCount;
                }).group(totalApplicants);

            // hiredNumber
            //     .formatNumber(d3.format("d"))
            //     .valueAccessor(function(d) {
            //       console.log(d);
            //       return d;
            //     }).group(totalHired);

            var xAxis = dateChart.xAxis().tickFormat(d3.time.format('%m/%d'));

            //Define threshold values for data
            var minDate = date.bottom(1)[0].datecomp;
            var maxDate = date.top(1)[0].datecomp;

            dateChart.height(280).margins({
                    top: 10,
                    right: 50,
                    bottom: 30,
                    left: 50
                }).dimension(date)
                .group(applicantsByDate)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .renderArea(true)
                .transitionDuration(500)
                .mouseZoomable(true)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .elasticY(true)
                .renderHorizontalGridLines(true)
                .renderVerticalGridLines(true)
                .yAxis().ticks(6);

            sourceChart
                .height(500)
                .dimension(source)
                .group(applicantsBySource)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            pipelineChart
                .height(750)
                .dimension(pipeline)
                .group(applicantsByPipeline)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            genderChart
                .height(350)
                .radius(90)
                .innerRadius(40)
                .transitionDuration(1000)
                .dimension(gender)
                .group(applicantsByGender)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                });

            hiredChart
                .height(350)
                .radius(90)
                .innerRadius(40)
                .transitionDuration(1000)
                .dimension(hired)
                .group(applicantsByHired)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                });

            ethnicityChart
                .height(350)
                .dimension(ethnicity)
                .group(applicantsByEthnicity)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            positionChart
                .height(350)
                .dimension(category)
                .group(applicantsByCategory)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            internalExternalChart
                .height(350)
                .dimension(internalexternal)
                .group(applicantsByInternalexternal)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            certificationChart
                .height(500)
                .dimension(certification)
                .group(applicantsByCertification)
                .valueAccessor(function(d) {
                    return d.value.applicationCount
                })
                .elasticX(true)
                .xAxis().ticks(5);

            //table
            var dataTableOptions = {
                "lengthMenu": [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"]
                ],
                "footerCallback": function(row, data, start, end, display) {
                    var api = this.api(),
                        data;
                },
                "order": [
                    [3, 'desc']
                ],
                scrollX: true,
                colReorder: true,
                sDom: '<"col-sm-3"<"text-left"i>><"col-sm-5 text-center"B><"col-sm-4"f>rt<"col-sm-4"l><"col-sm-8"p>',
                buttons: [{
                    extend: 'excelHtml5',
                    title: 'Applicant Table'
                }, {
                    extend: 'csvHtml5',
                    title: 'Applicant Table'
                }],
                columnDefs: [{
                    targets: 0,
                    width: '200px',
                    data: function(d) {
                        return (d.fullname);
                    }
                }, {
                    targets: 1,
                    width: '150px',
                    data: function(d) {
                        return (d.positioncategory);
                    }
                }, {
                    targets: 2,
                    width: '150px',
                    data: function(d) {
                        return (d.jobtypesappliedfor);
                    }
                }, {
                    targets: 3,
                    width: '150px',
                    data: function(d) {
                        return (d.lastaccess);
                    }
                }, {
                    targets: 4,
                    width: '150px',
                    data: function(d) {
                        return (d.current_pipeline_stage);
                    }
                }, {
                    targets: 5,
                    width: '150px',
                    data: function(d) {
                        return (d.hired_yn);
                    }
                }, {
                    targets: 6,
                    width: '150px',
                    data: function(d) {
                        return (d.fromwhichinstitutiondidyoureceiv);
                    }
                }, {
                    targets: 7,
                    width: '150px',
                    data: function(d) {
                        return (d.protectedgender);
                    }
                }, {
                    targets: 8,
                    width: '150px',
                    data: function(d) {
                        return (d.signle_race)
                    }
                }, {
                    targets: 9,
                    width: '150px',
                    data: function(d) {
                        return (d.primary_recruitment_source)
                    }
                }, {
                    targets: 10,
                    width: '150px',
                    data: function(d) {
                        return (d.internal_external)
                    }
                }],
                createdRow: function(row, data, index) {
                    if (data['hired_yn'] == 'Yes' || data['hired'] == 1) {
                        $('td', row).parent().addClass('success');
                    }
                    if (true) {
                        $('td', row).parent().addClass('text-center');
                    }
                }
            };

            var datatable = $('#applicant-table').dataTable(dataTableOptions);

            function RefreshTable() {
                dc.events.trigger(function() {
                    datatable.api().clear().rows.add(gender.top(Infinity)).draw();
                });
            }

            for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                var chartI = dc.chartRegistry.list()[i];
                chartI.on("filtered", RefreshTable);
            }
            RefreshTable();
            dc.renderAll();
        }
    }
});
