// This file is a part of quicksave project.
// Copyright (c) 2017 Aleksander Gajewski <adiog@quicksave.io>.

function DelayActionDom(delayAction)
{
    var dom = document.createElement('div');

    dom.appendChild(InlineLoader());

    dom.appendChild(delayAction.notificationArea);

    appendChild(
        dom,
        LabeledIconVariantButton(
            delayAction.successIcon,
            delayAction.successLabel,
            function (ev) {
                delayAction.doSuccessCallback()
            },
            'primary'
        )
    );

    appendChild(
        dom,
        LabeledIconVariantButton(
            delayAction.cancelIcon,
            delayAction.cancelLabel,
            function (ev) {
                delayAction.doCancelCallback();
            },
            'secondary'
        )
    );

    dom.style.visibility = 'hidden';

    return dom;
}

function notify(dom, remainingTime)
{
    console.log(remainingTime);
    dom.innerHTML = 'Autosave in ' + remainingTime/1000 + 's...';
}

class DelayAction
{
    constructor(successIcon, successLabel, successCallback, cancelIcon, cancelLabel, cancelCallback, delayTime=60000, tickTime=1000, notificationCallback=notify)
    {
        this.isRunning = false;
        this.remainingTime = 0;
        
        this.delayTime = delayTime;
        this.tickTime = tickTime;

        this.successIcon = successIcon;
        this.successLabel = successLabel;
        this.successCallback = successCallback;

        this.cancelIcon = cancelIcon;
        this.cancelLabel = cancelLabel;
        this.cancelCallback = cancelCallback;

        this.notificationCallback = notificationCallback;

        this.notificationArea = document.createElement('span');
        this.notificationArea.style = 'margin: 0 10px;';
        this.dom = DelayActionDom(this);
    }

    tick()
    {
        if (this.isRunning)
        {
            if (this.remainingTime > 0)
            {
                this.notificationCallback(this.notificationArea, this.remainingTime);
                this.remainingTime = this.remainingTime - this.tickTime;

                let delayAction = this;
                setTimeout(
                    function () {
                        delayAction.tick();
                    },
                    this.tickTime
                );
            }
            else
            {
                this.stop();
                this.successCallback();
            }
        }
    }

    restart()
    {
        console.log('restart');
        this.dom.style.visibility = 'visible';
        this.remainingTime = this.delayTime;
        if (!this.isRunning) {
            this.isRunning = true;
            this.tick();
        }

    }

    stop()
    {
        console.log('stop');
        this.dom.style.visibility = 'hidden';
        this.isRunning = false;
    }

    doSuccessCallback()
    {
        if (this.isRunning)
        {
            this.stop();
            this.successCallback();
        }
    }

    doCancelCallback()
    {
        if (this.isRunning)
        {
            this.stop();
            this.cancelCallback();
        }
    }
}
