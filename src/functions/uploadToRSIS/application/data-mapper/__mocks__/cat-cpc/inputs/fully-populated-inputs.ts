import { InterfaceType, ResultUpload } from '../../../../result-client';

export function getFullyPopulatedCatCPCTest(): ResultUpload {
  return {
    uploadKey: {
      applicationReference: {
        applicationId: 2222,
        bookingSequence: 11,
        checkDigit: 3,
      },
      staffNumber: '1122',
      interfaceType: InterfaceType.RSIS,
    },
    autosaved: 0, // false
    testResult: {
      rekey: false,
      version: '3.25.3',
      category: 'CCPC',
      testData: {
        question1: {
          score: 20,
          title: 'Loading the vehicle',
          answer1: {
            label: 'Shows by pointing to the correct distribution area (against the headboard)',
            selected: true,
          },
          answer2: {
            label: 'Selects correct restraint item - chain / tensioner',
            selected: true,
          },
          answer3: {
            label: 'Demonstrates competence in use of chain / tensioner',
            selected: true,
          },
          answer4: {
            label: 'Demonstrates how to release the restraining device',
            selected: true,
          },
          subtitle: 'You\'ve been asked to collect half a load of steel plates on an empty vehicle. Show me:',
          questionCode: 'Q08',
          additionalItems: [
            'a) by pointing to the correct distribution area(s) on this vehicle, where the load should be placed',
            'b) which restraining device you\'d use to secure the load ',
            'c) how you\'d secure the load with the restraining device, using the load securing trolley',
            'd) how you\'d release the restraining device.',
          ],
        },
        question2: {
          score: 20,
          title: 'Security of vehicle and contents',
          answer1: {
            label: 'Check the vehicle height sign matches the vehicle or load',
            selected: true,
          },
          answer2: {
            label: 'Plan a suitable route / look out for any height restrictions',
            selected: true,
          },
          answer3: {
            label: 'Measure the highest point of the vehicle or load',
            selected: true,
          },
          answer4: {
            label: 'Call the police and railway authority using the bridge ID plate ',
            selected: true,
          },
          subtitle: 'You are about to drive a high sided vehicle on an unfamiliar route. ',
          questionCode: 'Q04',
          additionalItems: [
            'a) Show me the visual checks you would make before starting your journey',
            'b) If there is any doubt of the vehicles height what else could you do?',
            'c) If you are involved in a railway bridge strike what action should you take? ',
          ],
        },
        question3: {
          score: 15,
          title: 'Preventing criminality and trafficking in illegal immigrants',
          answer1: {
            label: 'Check external compartments',
            selected: false,
          },
          answer2: {
            label: 'Check under and on top (visual if possible) of the vehicle',
            selected: true,
          },
          answer3: {
            label: 'Check inside the cab and load security. For example, check the trailer seals and curtains',
            selected: true,
          },
          answer4: {
            label: 'Check fuel cap in place (not tampered with). Visual check',
            selected: true,
          },
          // eslint-disable-next-line max-len
          subtitle: 'You\'ve parked at the docks and, following a rest break, you suspect your vehicle may have been tampered with. Show me what checks you\'d make around and inside your vehicle before continuing your journey.',
          questionCode: 'Q15',
          additionalItems: [],
        },
        question4: {
          score: 20,
          title: 'Assessing emergency situations',
          answer1: {
            label: 'Stop as quickly and safely as possible on the hard shoulder. ',
            selected: true,
          },
          answer2: {
            // eslint-disable-next-line max-len
            label: 'Identifies correct extinguisher to use on electrical system fire (CO2 / Powder) (Refer to photograph)',
            selected: true,
          },
          answer3: {
            label: 'Awareness of need to contact emergency services',
            selected: true,
          },
          answer4: {
            label: 'Isolate the vehicle (disconnect electric supply)',
            selected: true,
          },
          subtitle: 'You\'re driving on a motorway and flames appear from the engine compartment. Show me:',
          questionCode: 'Q11',
          additionalItems: [
            'a) how you’d deal with this small electrical wiring fire',
            'b) which is the appropriate fire extinguisher to use on this fire',
          ],
        },
        question5: {
          score: 20,
          title: 'Ability to prevent physical risk',
          answer1: {
            label: 'Brakes',
            selected: true,
          },
          answer2: {
            label: 'Horn',
            selected: true,
          },
          answer3: {
            label: 'Exhaust system(s)',
            selected: true,
          },
          answer4: {
            label: 'Lights/Reflectors',
            selected: true,
          },
          answer5: {
            label: 'Mirrors',
            selected: true,
          },
          answer6: {
            label: 'Instrument panel warning lights',
            selected: false,
          },
          answer7: {
            label: 'Tyres / Wheel fixings ',
            selected: true,
          },
          answer8: {
            label: 'Height marker',
            selected: true,
          },
          answer9: {
            label: 'Wipers / Washers',
            selected: true,
          },
          answer10: {
            label: 'Air leaks',
            selected: true,
          },
          // eslint-disable-next-line max-len
          subtitle: 'Show me and explain the daily safety checks you\'d make to this vehicle before driving on the road.',
          questionCode: 'Q05',
          additionalItems: [],
        },
        combination: 'LGV4',
        totalPercent: 95,
      },
      journalData: {
        examiner: {
          staffNumber: '10000012',
          individualId: 1000012,
        },
        candidate: {
          gender: 'M',
          candidateId: 108,
          dateOfBirth: '1989-01-01',
          driverNumber: 'DOEXX653220A99HC',
          emailAddress: 'ken.doe@example.com',
          candidateName: {
            title: 'Mrs',
            lastName: 'Doe',
            firstName: 'Ken',
          },
          ethnicityCode: 'C',
          mobileTelephone: '07654 123456',
          candidateAddress: {
            postcode: 'AB45 6CD',
            addressLine1: 'My House',
            addressLine2: 'Someplace',
            addressLine3: 'Sometown',
          },
        },
        testCentre: {
          centreId: 54321,
          costCode: 'EXTC1',
          centreName: 'Example Test Centre',
        },
        testSlotAttributes: {
          start: '2020-06-18T09:18:00',
          slotId: 2218,
          slotType: 'Standard Test',
          welshTest: false,
          extendedTest: false,
          specialNeeds: true,
          vehicleTypeCode: 'C',
          entitlementCheck: false,
          examinerVisiting: false,
          specialNeedsCode: 'YES',
          specialNeedsArray: [
            'Candidate has dyslexia',
          ],
          previousCancellation: [
            'DSA',
            'Act of nature',
          ],
        },
        applicationReference: {
          checkDigit: 9,
          applicationId: 22123470,
          bookingSequence: 1,
        },
      },
      rekeyReason: {
        other: {
          reason: '',
          selected: false,
        },
        transfer: {
          selected: false,
        },
        ipadIssue: {
          lost: false,
          broken: false,
          stolen: false,
          selected: false,
          technicalFault: false,
        },
      },
      testSummary: {
        D255: false,
        assessmentReport: 'this is a detailed assessment report',
        additionalInformation: 'some additional information',
        candidateDescription: 'some description of the candidate',
        identification: 'Licence',
      },
      activityCode: '1',
      changeMarker: false,
      accompaniment: {
        interpreter: true,
      },
      examinerKeyed: 10000012,
      examinerBooked: 10000012,
      passCompletion: {
        passCertificateNumber: 'X123456x',
      },
      vehicleDetails: {
        configuration: 'Rigid',
        registrationNumber: 'A1',
        gearboxCategory: 'Automatic',
      },
      examinerConducted: 10000012,
      preTestDeclarations: {
        // eslint-disable-next-line max-len
        preTestSignature: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNzA2IDI1NiIgd2lkdGg9IjcwNiIgaGVpZ2h0PSIyNTYiPjxwYXRoIGQ9Ik0gMjE4LjAwMCwxMjYuMDAwIEMgMjI1LjAwMCwxMjYuNTAwIDIyNS4wNTksMTI3Ljg1OCAyMzIuMDAwLDEyNy4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjMyLjAwMCwxMjcuMDAwIEMgMjY5LjU1OSwxMjIuMzU4IDI3MC4xMjMsMTIzLjE5NSAzMDcuMDAwLDExNS4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzA3LjAwMCwxMTUuMDAwIEMgMzE5LjYyMywxMTIuMTk1IDMxOS43MjMsMTExLjIzMiAzMzEuMDAwLDEwNS4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzMxLjAwMCwxMDUuMDAwIEMgMzM4LjcyMywxMDAuNzMyIDMzOS44MjMsMTAwLjgxMiAzNDUuMDAwLDk0LjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjMwMCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzNDUuMDAwLDk0LjAwMCBDIDM0OS4zMjMsODguMzEyIDM0OC4xMjksODcuMTA5IDM1MC4wMDAsODAuMDAwIiBzdHJva2Utd2lkdGg9IjIuNzQ5IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDM1MC4wMDAsODAuMDAwIEMgMzUwLjYyOSw3Ny42MDkgMzUwLjY0MSw3Ny4zNDkgMzUwLjAwMCw3NS4wMDAiIHN0cm9rZS13aWR0aD0iMy42NzAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzUwLjAwMCw3NS4wMDAgQyAzNDkuMTQxLDcxLjg0OSAzNDkuMzc1LDcwLjU4NCAzNDcuMDAwLDY5LjAwMCIgc3Ryb2tlLXdpZHRoPSIzLjg3MSIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzNDcuMDAwLDY5LjAwMCBDIDM0NC44NzUsNjcuNTg0IDM0My41NzQsNjcuOTcxIDM0MS4wMDAsNjkuMDAwIiBzdHJva2Utd2lkdGg9IjQuMDY3IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDM0MS4wMDAsNjkuMDAwIEMgMzM4LjU3NCw2OS45NzEgMzM4LjQxNiw3MC42MzkgMzM3LjAwMCw3My4wMDAiIHN0cm9rZS13aWR0aD0iNC4xNzMiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzM3LjAwMCw3My4wMDAgQyAzMzUuNDE2LDc1LjYzOSAzMzUuNTU4LDc1LjkyOCAzMzUuMDAwLDc5LjAwMCIgc3Ryb2tlLXdpZHRoPSI0LjA3MyIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzMzUuMDAwLDc5LjAwMCBDIDMzNC41NTgsODEuNDI4IDMzMy44ODgsODEuOTYxIDMzNS4wMDAsODQuMDAwIiBzdHJva2Utd2lkdGg9IjQuMjYxIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDMzNS4wMDAsODQuMDAwIEMgMzM2Ljg4OCw4Ny40NjEgMzM3LjI5Miw4OC4xNDYgMzQxLjAwMCw5MC4wMDAiIHN0cm9rZS13aWR0aD0iMy44OTIiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzQxLjAwMCw5MC4wMDAgQyAzNDkuMjkyLDk0LjE0NiAzNDkuNzczLDkzLjk1MCAzNTkuMDAwLDk2LjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjkzNyIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzNTkuMDAwLDk2LjAwMCBDIDM3Mi4yNzMsOTguOTUwIDM3Mi40MjcsOTguOTk1IDM4Ni4wMDAsMTAwLjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjM0NSIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzODYuMDAwLDEwMC4wMDAgQyAzOTkuNDI3LDEwMC45OTUgMzk5LjY2MywxMDEuNDgyIDQxMy4wMDAsMTAwLjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjI1MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA0MTMuMDAwLDEwMC4wMDAgQyA0MjYuNjYzLDk4LjQ4MiA0MjYuNzgwLDk3Ljg2OSA0NDAuMDAwLDk0LjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjI1MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA0NDAuMDAwLDk0LjAwMCBDIDQ0Ny4yODAsOTEuODY5IDQ0Ny4yOTEsOTEuNTg2IDQ1NC4wMDAsODguMDAwIiBzdHJva2Utd2lkdGg9IjIuNjYyIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48L3N2Zz4=',
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: true,
      },
      postTestDeclarations: {
        // eslint-disable-next-line max-len
        postTestSignature: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNzA2IDI1NiIgd2lkdGg9IjcwNiIgaGVpZ2h0PSIyNTYiPjxwYXRoIGQ9Ik0gMTY3LjAwMCwxMjUuMDAwIEMgMTc2LjAwMCwxMjEuNTAwIDE3NS42MTYsMTIwLjE3MyAxODUuMDAwLDExOC4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMTg1LjAwMCwxMTguMDAwIEMgMjIzLjExNiwxMDkuMTczIDIyMy40MjgsMTEwLjA1MSAyNjIuMDAwLDEwMy4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjYyLjAwMCwxMDMuMDAwIEMgMjY5LjkyOCwxMDEuNTUxIDI2OS45OTMsMTAxLjk0MiAyNzguMDAwLDEwMS4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjc4LjAwMCwxMDEuMDAwIEMgMjk1LjQ5Myw5OC45NDIgMjk1LjU2NSw5OS40NTIgMzEzLjAwMCw5Ny4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gMzEzLjAwMCw5Ny4wMDAgQyAzMjcuNTY1LDk0Ljk1MiAzMjcuNTE1LDk0LjU4NyAzNDIuMDAwLDkyLjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjI1MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzNDIuMDAwLDkyLjAwMCBDIDM1NS41MTUsODkuNTg3IDM1NS40OTYsODkuNDc2IDM2OS4wMDAsODcuMDAwIiBzdHJva2Utd2lkdGg9IjIuMjUwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDM2OS4wMDAsODcuMDAwIEMgMzg1LjQ5Niw4My45NzYgMzg1LjQ3Myw4My44MjIgNDAyLjAwMCw4MS4wMDAiIHN0cm9rZS13aWR0aD0iMi4yNTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gNDAyLjAwMCw4MS4wMDAgQyA0MDUuOTczLDgwLjMyMiA0MDUuOTk0LDgwLjQ0NSA0MTAuMDAwLDgwLjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjkzMyIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA0MTAuMDAwLDgwLjAwMCBDIDQxOS40OTQsNzguOTQ1IDQxOS41MDIsNzkuMDE4IDQyOS4wMDAsNzguMDAwIiBzdHJva2Utd2lkdGg9IjIuNzI4IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48L3N2Zz4=',
        healthDeclarationAccepted: false,
        passCertificateNumberReceived: true,
      },
      communicationPreferences: {
        updatedEmail: 'ken.doe@example.com',
        conductedLanguage: 'English',
        communicationMethod: 'Post',
      },
    },
  };
}
