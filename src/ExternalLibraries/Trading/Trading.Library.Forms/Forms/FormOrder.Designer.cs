namespace Trading.Library.Forms.Forms
{
    partial class FormOrder
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FormOrder));
            userControlOrderFull = new UserControls.UserControlOrderFull();
            SuspendLayout();
            // 
            // userControlOrderFull1
            // 
            userControlOrderFull.Dock = System.Windows.Forms.DockStyle.Fill;
            userControlOrderFull.Location = new System.Drawing.Point(0, 0);
            userControlOrderFull.Name = "userControlOrderFull";
            userControlOrderFull.Size = new System.Drawing.Size(800, 450);
            userControlOrderFull.TabIndex = 0;
            // 
            // FormOrder
            // 
            AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            ClientSize = new System.Drawing.Size(800, 450);
            Controls.Add(userControlOrderFull);
            Icon = (System.Drawing.Icon)resources.GetObject("$this.Icon");
            Name = "FormOrder";
            Text = "Order";
            Load += FormOrder_Load;
            ResumeLayout(false);
        }

        #endregion

        private UserControls.UserControlOrderFull userControlOrderFull;
    }
}